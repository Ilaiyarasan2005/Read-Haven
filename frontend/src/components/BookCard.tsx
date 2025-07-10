
import React from 'react';
import { Star, BookOpen, ExternalLink, Download } from 'lucide-react';

interface Book {
  _id: string;
  title: string;
  author: string;
  cover: string;
  rating: number;
  price?: string;
  description?: string;
  genre?: string;
  documentUrl?: string;
  pdfUrl?: string;
  url?: string;
}

interface BookCardProps {
  book: Book;
  variant?: 'default' | 'horizontal' | 'large';
  showDescription?: boolean;
}

const BookCard: React.FC<BookCardProps> = ({ 
  book, 
  variant = 'default', 
  showDescription = false 
}) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleBookClick = () => {
    // Priority: documentUrl -> pdfUrl -> url -> fallback
    if (book.documentUrl) {
      window.open(book.documentUrl, '_blank');
    } else if (book.pdfUrl) {
      window.open(book.pdfUrl, '_blank');
    } else if (book.url) {
      window.open(book.url, '_blank');
    } else {
      // Fallback for demo books without URLs
      console.log(`Opening book: ${book.title}`);
      alert(`Opening "${book.title}" - This is a demo book. In a real app, this would open the book document.`);
    }
  };

  const handleDownload = () => {
    // Priority: documentUrl -> pdfUrl -> url -> fallback
    if (book.documentUrl) {
      const link = document.createElement('a');
      link.href = book.documentUrl;
      link.download = `${book.title}.pdf`;
      link.click();
    } else if (book.pdfUrl) {
      const link = document.createElement('a');
      link.href = book.pdfUrl;
      link.download = `${book.title}.pdf`;
      link.click();
    } else if (book.url) {
      window.open(book.url, '_blank');
    } else {
      console.log(`Downloading book: ${book.title}`);
      alert(`Download "${book.title}" - This is a demo book. In a real app, this would download the book file.`);
    }
  };

  if (variant === 'horizontal') {
    return (
      <div className="book-card min-w-[200px] p-0">
        <div className="aspect-[3/4] relative overflow-hidden rounded-t-xl">
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="font-semibold text-sm truncate">{book.title}</h3>
            <p className="text-xs opacity-90 truncate">{book.author}</p>
          </div>
        </div>
        <div className="p-4 space-y-2">
          <button 
            onClick={handleBookClick}
            className="w-full bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            Continue Reading
          </button>
          <button 
            onClick={handleDownload}
            className="w-full bg-secondary text-secondary-foreground py-2 rounded-lg hover:bg-secondary/80 transition-colors text-sm font-medium flex items-center justify-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Download</span>
          </button>
        </div>
      </div>
    );
  }

  if (variant === 'large') {
    return (
      <div className="book-card p-6">
        <div className="flex gap-6">
          <div className="w-32 h-48 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={book.cover}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">{book.title}</h3>
            <p className="text-muted-foreground mb-3">by {book.author}</p>
            <div className="flex items-center space-x-1 mb-3">
              {renderStars(book.rating)}
              <span className="text-sm text-muted-foreground ml-2">
                ({book.rating}/5)
              </span>
            </div>
            {showDescription && book.description && (
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {book.description}
              </p>
            )}
            <div className="flex items-center gap-3">
              <button 
                onClick={handleBookClick}
                className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium flex items-center space-x-2"
              >
                <BookOpen className="h-4 w-4" />
                <span>Read Now</span>
              </button>
              <button 
                onClick={handleDownload}
                className="bg-secondary text-secondary-foreground px-6 py-2 rounded-lg hover:bg-secondary/80 transition-colors font-medium flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="book-card p-0 cursor-pointer" onClick={handleBookClick}>
      <div className="aspect-[3/4] relative overflow-hidden rounded-t-xl">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-full object-cover"
        />
        {book.genre && (
          <div className="absolute top-2 left-2">
            <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
              {book.genre}
            </span>
          </div>
        )}
        {(book.documentUrl || book.pdfUrl || book.url) && (
          <div className="absolute top-2 right-2">
            <ExternalLink className="h-4 w-4 text-white bg-black/50 rounded p-1" size={20} />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold mb-1 line-clamp-2">{book.title}</h3>
        <p className="text-sm text-muted-foreground mb-3">by {book.author}</p>
        <div className="flex items-center space-x-1 mb-3">
          {renderStars(book.rating)}
          <span className="text-xs text-muted-foreground ml-1">
            ({book.rating})
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
            Read Now
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleDownload();
            }}
            className="bg-secondary text-secondary-foreground px-3 py-2 rounded-lg hover:bg-secondary/80 transition-colors"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
