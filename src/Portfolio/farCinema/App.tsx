import React, { useState } from 'react';
import { MovieList } from './MovieList';
import { SeatMap } from './SeatMap';
import { DateSelection } from './DateSelection';
import { ContactForm } from './ContactForm';

const fetch = require('node-fetch');

const url = 'https://api.themoviedb.org/3/discover/movie';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTI2NjU4NjQ0OTZlOTVmYjE0NTNlNzUwOGY0NTFlYiIsInN1YiI6IjY0YzIyY2JkMWNmZTNhMGViNDI5YTg4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.V1CtXghYLp-YSf3uiV7rkyapbmuN7xAlT9LoSt5zPvw'
  }
};
let movies: any[];
fetch(url, options)
  .then((res: any) => res.json())
  .then((json: any) => movies = json.results)
  .catch((err: any) => console.error('error:' + err));

const moviesData = [
  { id: 1, title: 'The Adventure Begins', availableDates: ['2023-08-01', '2023-08-02'] },
  { id: 2, title: 'Laugh Out Loud', availableDates: ['2023-08-03', '2023-08-04'] },
  { id: 3, title: 'Mystery of the Hidden Gem', availableDates: ['2023-08-05', '2023-08-06'] },
  { id: 4, title: 'Sci-Fi Galaxy', availableDates: ['2023-08-07', '2023-08-08'] },
  { id: 5, title: 'Love in Paris', availableDates: ['2023-08-09', '2023-08-10'] },
  { id: 6, title: 'Action Heroes', availableDates: ['2023-08-11', '2023-08-12'] },
  { id: 7, title: 'Comedy Club', availableDates: ['2023-08-13', '2023-08-14'] },
  { id: 8, title: 'Romantic Getaway', availableDates: ['2023-08-15', '2023-08-16'] },
  { id: 9, title: 'Thrills and Chills', availableDates: ['2023-08-17', '2023-08-18'] },
  { id: 10, title: 'Family Fun Time', availableDates: ['2023-08-19', '2023-08-20'] },
  // Add more fictional movie data here
];

function App() {
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [selectedSeat, setSelectedSeat] = useState<any>(null);
  const [contactInfo, setContactInfo] = useState(null);

  const handleMovieSelect = (movie: any) => {
    setSelectedMovie(movie);
    setSelectedDate(null);
    setSelectedSeat(null);
    setContactInfo(null);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedSeat(null);
    setContactInfo(null);
  };

  const handleSeatSelect = (seat: string) => {
    setSelectedSeat(seat);
    setContactInfo(null);
  };

  const handleFormSubmit = (data: any) => {
    setContactInfo(data);
  };

  return (
    <div className="App">
      <h1>Welcome to Our Cinema</h1>
      {movies?.map(movie => <div>
        <img width={200} src={'https://image.tmdb.org/t/p/original/' + movie.poster_path} />
        <p>
          {movie.title}
        </p>
      </div>)}
      {!selectedMovie && <MovieList movies={moviesData} onSelect={handleMovieSelect} />}
      {selectedMovie && !selectedDate && (
        <DateSelection
          movie={selectedMovie}
          onSelect={handleDateSelect}
          availableDates={selectedMovie.availableDates}
        />
      )}
      {selectedMovie && selectedDate && !selectedSeat && (
        <SeatMap
          movie={selectedMovie}
          date={selectedDate}
          onSelect={handleSeatSelect}
          bookedSeats={['A1', 'B5']} // Fictional data for booked seats
        />
      )}
      {selectedMovie && selectedDate && selectedSeat && !contactInfo && (
        <ContactForm onSubmit={handleFormSubmit} />
      )}
      {contactInfo && (
        <div>
          <h2>Booking Summary:</h2>
          <p>Movie: {selectedMovie.title}</p>
          <p>Date: {selectedDate}</p>
          <p>Seat: {selectedSeat}</p>
          <p>Contact Information: {JSON.stringify(contactInfo)}</p>
        </div>
      )}
    </div>
  );
}

export default App;
