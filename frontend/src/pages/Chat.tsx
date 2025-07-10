
import React, { useState, useRef, useEffect } from 'react';
import { Send, Lightbulb, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ChatMessage from '../components/ChatMessage';
import { getRandomPrompt, getMultiplePrompts } from '../data/writingPrompts';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your writing assistant. I can help you with creative writing prompts, story ideas, and writing inspiration. Type 'prompt' for a writing prompt, or just chat with me!",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('prompt') || lowerMessage.includes('idea')) {
      return `Here's a writing prompt for you:\n\n"${getRandomPrompt()}"\n\nFeel free to ask for another prompt or let me know if you'd like help developing this idea!`;
    }
    
    if (lowerMessage.includes('multiple') || lowerMessage.includes('several') || lowerMessage.includes('more')) {
      const prompts = getMultiplePrompts(3);
      return `Here are multiple writing prompts for you:\n\n${prompts.map((prompt, index) => `${index + 1}. "${prompt}"`).join('\n\n')}\n\nWhich one interests you most?`;
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('stuck')) {
      return "I understand writer's block can be frustrating! Here are some ways I can help:\n\n• Type 'prompt' for a creative writing prompt\n• Share your story idea and I'll help develop it\n• Ask for character development tips\n• Request plot suggestions\n\nWhat would you like to explore?";
    }
    
    if (lowerMessage.includes('character')) {
      return "Character development is crucial for great stories! Consider these elements:\n\n• What does your character want most?\n• What's their biggest fear or weakness?\n• What's a secret they're hiding?\n• How do they speak or move uniquely?\n\nWould you like a character-focused writing prompt?";
    }
    
    if (lowerMessage.includes('plot') || lowerMessage.includes('story')) {
      return "Great stories often follow this structure:\n\n• Hook: Start with intrigue\n• Inciting incident: What changes everything?\n• Rising action: Build tension\n• Climax: The big moment\n• Resolution: Tie up loose ends\n\nWant a plot-focused prompt to practice with?";
    }
    
    // Default responses
    const responses = [
      "That's interesting! How can I help you develop that idea further?",
      "Tell me more about what you're working on. I'd love to help!",
      "Would you like a writing prompt to spark some creativity?",
      "What genre or type of story are you most interested in writing?",
      "I'm here to help with your creative writing journey. What's on your mind?",
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(inputValue),
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickPrompt = () => {
    const prompt = getRandomPrompt();
    const botMessage: Message = {
      id: Date.now().toString(),
      content: `Here's a writing prompt for you:\n\n"${prompt}"\n\nFeel free to ask for another or let me know how you'd like to develop this!`,
      isUser: false,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, botMessage]);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Writing Assistant</h1>
                <p className="text-sm text-muted-foreground">Get creative prompts and writing help</p>
              </div>
              <Button onClick={quickPrompt} variant="outline" size="sm" className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Quick Prompt
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto pb-32">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          
          {isTyping && (
            <div className="flex gap-3 p-4">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <RefreshCw className="h-4 w-4 animate-spin" />
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-sm text-muted-foreground">Thinking...</p>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
          <div className="max-w-4xl mx-auto p-4">
            <div className="flex gap-2">
              <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask for writing prompts, story ideas, or just chat..."
                className="min-h-[60px] resize-none"
                rows={2}
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={!inputValue.trim() || isTyping}
                size="lg"
                className="px-6"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2 mt-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setInputValue('Give me a writing prompt')}
                className="text-xs"
              >
                Get Prompt
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setInputValue('I need help with my story')}
                className="text-xs"
              >
                Story Help
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setInputValue('Character development tips')}
                className="text-xs"
              >
                Character Tips
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
