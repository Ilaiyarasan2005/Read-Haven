
import React from 'react';
import { ChevronRight, BookOpen, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import BookCard from '../components/BookCard';
import { getLastReadBooks, getNewBooks } from '../data/booksData';

const Home = () => {
  const lastReadBooks = getLastReadBooks();
  const newBooks = getNewBooks();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-primary/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Digital{' '}
              <span className="gradient-text">Library</span>{' '}
              Awaits
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover thousands of books, track your reading progress, and dive into new worlds of knowledge and imagination.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/books"
                className="bg-primary text-primary-foreground px-8 py-4 rounded-xl hover:bg-primary/90 transition-colors font-semibold text-lg flex items-center justify-center space-x-2"
              >
                <BookOpen className="h-5 w-5" />
                <span>Explore Books</span>
              </Link>
              <Link
                to="/about"
                className="border border-border px-8 py-4 rounded-xl hover:bg-muted transition-colors font-semibold text-lg"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Continue Reading Section */}
      {lastReadBooks.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <BookOpen className="h-6 w-6 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold">Continue Reading</h2>
              </div>
              <Link
                to="/profile"
                className="text-primary hover:text-primary/80 transition-colors flex items-center space-x-1"
              >
                <span>View All</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="flex gap-6 overflow-x-auto pb-4">
              {lastReadBooks.map((book) => (
                <BookCard key={book.id} book={book} variant="horizontal" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* New & Popular Books Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-6 w-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold">New & Popular</h2>
            </div>
            <Link
              to="/books"
              className="text-primary hover:text-primary/80 transition-colors flex items-center space-x-1"
            >
              <span>View All</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {newBooks.slice(0, 8).map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/books"
              className="bg-primary text-primary-foreground px-8 py-3 rounded-xl hover:bg-primary/90 transition-colors font-semibold inline-flex items-center space-x-2"
            >
              <span>Discover More Books</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">10,000+</div>
              <div className="text-muted-foreground">Books Available</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">50,000+</div>
              <div className="text-muted-foreground">Happy Readers</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">25+</div>
              <div className="text-muted-foreground">Book Categories</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
