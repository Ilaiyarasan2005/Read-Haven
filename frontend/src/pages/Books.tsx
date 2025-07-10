
import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import BookCard from '../components/BookCard';
import { getBooks } from '../services/bookService';
import { toast } from 'sonner';

const Books = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await getBooks({ genre: selectedGenre, sortBy });
        setBooks(data);
        const uniqueGenres = Array.from(new Set(data.map(book => book.genre)));
        setGenres(uniqueGenres);
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Failed to fetch books');
      }
    };
    fetchBooks();
  }, [selectedGenre, sortBy]);

  const filteredAndSortedBooks = useMemo(() => {
    let filtered = books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           book.author.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });

    // Sort books (backend should handle this, but keeping for frontend consistency if needed)
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'author':
          return a.author.localeCompare(b.author);
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          // Assuming there's a creation date or similar for 'newest'
          return 0; // Placeholder, implement actual sorting if date available
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, books, sortBy]);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Book Library</h1>
          <p className="text-muted-foreground text-lg">
            Discover your next favorite book from our extensive collection
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-card rounded-xl p-6 mb-8 shadow-sm border">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search books or authors..."
                className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Genre Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                className="border border-input rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
              >
                <option value="">All Genres</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <select
              className="border border-input rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="title">Sort by Title</option>
              <option value="author">Sort by Author</option>
              <option value="rating">Sort by Rating</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredAndSortedBooks.length} book{filteredAndSortedBooks.length !== 1 ? 's' : ''}
            {selectedGenre && ` in ${selectedGenre}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Books Grid */}
        {filteredAndSortedBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedBooks.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-2">No books found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
