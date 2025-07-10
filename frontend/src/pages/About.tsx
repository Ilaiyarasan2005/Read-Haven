
import React from 'react';
import { BookOpen, Users, Star, Target } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Vast Library",
      description: "Access thousands of books across all genres, from classic literature to modern bestsellers."
    },
    {
      icon: Users,
      title: "Community",
      description: "Join a community of passionate readers, share reviews, and discover recommendations."
    },
    {
      icon: Star,
      title: "Personalized",
      description: "Get personalized recommendations based on your reading history and preferences."
    },
    {
      icon: Target,
      title: "Track Progress",
      description: "Monitor your reading goals, track finished books, and celebrate your achievements."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-primary/5 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="gradient-text">ReadHaven</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            ReadHaven is your digital sanctuary for books, designed to enhance your reading journey and connect you with stories that matter. We believe that every book has the power to transform, educate, and inspire.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              We're on a mission to make reading more accessible, enjoyable, and social. Whether you're a casual reader or a book enthusiast, ReadHaven provides the tools and community to help you discover, read, and share the books you love.
            </p>
            <div className="bg-card rounded-2xl p-8 shadow-sm border">
              <blockquote className="text-xl italic text-foreground mb-4">
                "A reader lives a thousand lives before he dies. The man who never reads lives only one."
              </blockquote>
              <cite className="text-muted-foreground">— George R.R. Martin</cite>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose ReadHaven?</h2>
            <p className="text-lg text-muted-foreground">
              We've built features that make your reading experience seamless and enjoyable
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="font-semibold text-lg mb-2">Quality</h3>
              <p className="text-muted-foreground">
                We curate high-quality books and maintain a platform that's reliable and user-friendly.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="font-semibold text-lg mb-2">Community</h3>
              <p className="text-muted-foreground">
                Reading is better when shared. We foster a supportive community of book lovers.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="font-semibold text-lg mb-2">Innovation</h3>
              <p className="text-muted-foreground">
                We continuously improve our platform with new features and better user experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Reading?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of readers who have made ReadHaven their digital home for books.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/books"
              className="bg-primary text-primary-foreground px-8 py-4 rounded-xl hover:bg-primary/90 transition-colors font-semibold text-lg"
            >
              Browse Books
            </a>
            <a
              href="/login"
              className="border border-border px-8 py-4 rounded-xl hover:bg-muted transition-colors font-semibold text-lg"
            >
              Create Account
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
