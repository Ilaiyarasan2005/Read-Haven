
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Plus, Upload, FileText, Link, Image } from 'lucide-react';

interface BookUploadDialogProps {
  onBookAdd: (book: any) => void;
}

const BookUploadDialog: React.FC<BookUploadDialogProps> = ({ onBookAdd }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    cover: '',
    coverUrl: '',
    pdf: null as File | null,
    documentUrl: ''
  });
  const [coverPreview, setCoverPreview] = useState('');
  const [pdfFileName, setPdfFileName] = useState('');
  const [coverInputType, setCoverInputType] = useState<'file' | 'url'>('file');
  const [documentInputType, setDocumentInputType] = useState<'file' | 'url'>('file');

  const handleCoverChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setCoverPreview(result);
        setFormData({ ...formData, cover: result, coverUrl: '' });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverUrlChange = (url: string) => {
    setFormData({ ...formData, coverUrl: url, cover: '' });
    setCoverPreview(url);
  };

  const handlePdfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData({ ...formData, pdf: file, documentUrl: '' });
      setPdfFileName(file.name);
    }
  };

  const handleDocumentUrlChange = (url: string) => {
    setFormData({ ...formData, documentUrl: url, pdf: null });
    setPdfFileName('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.author) {
      const newBook = {
        title: formData.title,
        author: formData.author,
        description: formData.description,
        coverImage: formData.cover || formData.coverUrl || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop',
        documentUrl: formData.documentUrl
      };
      
      onBookAdd(newBook);
      
      // Reset form
      setFormData({
        title: '',
        author: '',
        description: '',
        cover: '',
        coverUrl: '',
        pdf: null,
        documentUrl: ''
      });
      setCoverPreview('');
      setPdfFileName('');
      setCoverInputType('file');
      setDocumentInputType('file');
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Book</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Book</DialogTitle>
          <DialogDescription>
            Add a new book to your personal library by uploading files or providing URLs.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Book Cover Section */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Book Cover</Label>
            
            {/* Cover Input Type Toggle */}
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                variant={coverInputType === 'file' ? 'default' : 'outline'}
                onClick={() => setCoverInputType('file')}
                className="flex items-center gap-1"
              >
                <Upload className="h-3 w-3" />
                File
              </Button>
              <Button
                type="button"
                size="sm"
                variant={coverInputType === 'url' ? 'default' : 'outline'}
                onClick={() => setCoverInputType('url')}
                className="flex items-center gap-1"
              >
                <Link className="h-3 w-3" />
                URL
              </Button>
            </div>

            {/* Cover Preview and Input */}
            <div className="flex items-start space-x-4">
              <div className="w-20 h-28 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                {coverPreview ? (
                  <img src={coverPreview} alt="Cover preview" className="w-full h-full object-cover" />
                ) : (
                  <Image className="h-6 w-6 text-gray-400" />
                )}
              </div>
              
              <div className="flex-1 space-y-2">
                {coverInputType === 'file' ? (
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverChange}
                    className="text-sm"
                  />
                ) : (
                  <Input
                    type="url"
                    placeholder="Enter image URL..."
                    value={formData.coverUrl}
                    onChange={(e) => handleCoverUrlChange(e.target.value)}
                    className="text-sm"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Book Details */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">Title *</Label>
            <Input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author" className="text-sm font-medium">Author *</Label>
            <Input
              id="author"
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">Description</Label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none text-sm"
            />
          </div>

          {/* Document Upload Section */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Document/PDF</Label>
            
            {/* Document Input Type Toggle */}
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                variant={documentInputType === 'file' ? 'default' : 'outline'}
                onClick={() => setDocumentInputType('file')}
                className="flex items-center gap-1"
              >
                <Upload className="h-3 w-3" />
                File
              </Button>
              <Button
                type="button"
                size="sm"
                variant={documentInputType === 'url' ? 'default' : 'outline'}
                onClick={() => setDocumentInputType('url')}
                className="flex items-center gap-1"
              >
                <Link className="h-3 w-3" />
                URL
              </Button>
            </div>

            {/* Document Input */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <div className="text-center space-y-2">
                <FileText className="h-8 w-8 text-gray-400 mx-auto" />
                
                {documentInputType === 'file' ? (
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx,.epub"
                    onChange={handlePdfChange}
                    className="text-sm"
                  />
                ) : (
                  <Input
                    type="url"
                    placeholder="Enter document URL (PDF, EPUB, etc.)..."
                    value={formData.documentUrl}
                    onChange={(e) => handleDocumentUrlChange(e.target.value)}
                    className="text-sm"
                  />
                )}
                
                {pdfFileName && (
                  <p className="text-sm text-green-600">Selected: {pdfFileName}</p>
                )}
                {formData.documentUrl && (
                  <p className="text-sm text-blue-600">URL: {formData.documentUrl}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="submit" className="flex-1">Add Book</Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookUploadDialog;
