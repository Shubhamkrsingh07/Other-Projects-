import React, { useState } from 'react';
import { Search } from 'lucide-react';

const movies = [
  { 
    id: 1, 
    title: 'Inception', 
    image: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg', 
    price: 12,
    genre: 'Sci-Fi'
  },
  { 
    id: 2, 
    title: 'The Dark Knight', 
    image: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg', 
    price: 10,
    genre: 'Action'
  },
  { 
    id: 3, 
    title: 'Interstellar', 
    image: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg', 
    price: 11,
    genre: 'Sci-Fi'
  },
  { 
    id: 4, 
    title: 'Pulp Fiction', 
    image: 'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg', 
    price: 9,
    genre: 'Crime'
  },
  { 
    id: 5, 
    title: 'The Matrix', 
    image: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg', 
    price: 10,
    genre: 'Sci-Fi'
  }
];

const MovieCard = ({ movie, onBook }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
    <img src={movie.image} alt={movie.title} className="w-full h-96 object-cover" />
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
      <p className="text-gray-600 mb-2">Genre: {movie.genre}</p>
      <p className="text-gray-600 mb-4">Price: ${movie.price}</p>
      <button
        onClick={() => onBook(movie)}
        className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
      >
        Book Now
      </button>
    </div>
  </div>
);

const SearchBar = ({ onSearch }) => (
  <div className="relative mb-6">
    <input
      type="text"
      placeholder="Search movies..."
      onChange={(e) => onSearch(e.target.value)}
      className="w-full p-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-600"
    />
    <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
  </div>
);

const BookingModal = ({ movie, seats, setSeats, onConfirm, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg max-w-md w-full">
      <h2 className="text-2xl font-bold mb-4">Book Tickets for {movie.title}</h2>
      <img src={movie.image} alt={movie.title} className="w-full h-64 object-cover rounded mb-4" />
      <p className="mb-2">Price per ticket: ${movie.price}</p>
      <label className="block mb-4">
        Number of seats:
        <input
          type="number"
          min="1"
          value={seats}
          onChange={(e) => setSeats(parseInt(e.target.value) || 1)}
          className="w-full p-2 border rounded mt-1"
        />
      </label>
      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  </div>
);

const BookMyShow = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [seats, setSeats] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const handleBook = (movie) => {
    setSelectedMovie(movie);
  };

  const confirmBooking = () => {
    if (selectedMovie) {
      alert(`Booked ${seats} seat(s) for ${selectedMovie.title}. Total price: $${selectedMovie.price * seats}`);
      setSelectedMovie(null);
      setSeats(1);
    }
  };

  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-red-600">Book My Show</h1>
      <SearchBar onSearch={setSearchTerm} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onBook={handleBook} />
        ))}
      </div>
      {selectedMovie && (
        <BookingModal
          movie={selectedMovie}
          seats={seats}
          setSeats={setSeats}
          onConfirm={confirmBooking}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
};

export default BookMyShow;