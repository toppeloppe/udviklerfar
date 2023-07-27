import React, { useState } from 'react';
import { Movie } from './Movie';
import { SeatMap } from './SeatMap';
import { DateSelection } from './DateSelection';
import { ContactForm } from './ContactForm';
import farDesign from './farCinema.module.scss'
import { IMovie } from '../../Models/iMovie';
import { ScrollContainer } from 'react-indiana-drag-scroll';
import 'react-indiana-drag-scroll/dist/style.css'
import './../../global.scss'
import 'animate.css'
import { FaArrowLeft, FaArrowRight, FaBackward, FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';
import { Button } from '@mui/material';
const fetch = require('node-fetch');

const url = 'https://api.themoviedb.org/3/discover/movie';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTI2NjU4NjQ0OTZlOTVmYjE0NTNlNzUwOGY0NTFlYiIsInN1YiI6IjY0YzIyY2JkMWNmZTNhMGViNDI5YTg4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.V1CtXghYLp-YSf3uiV7rkyapbmuN7xAlT9LoSt5zPvw'
  }
};
let movies: any[] = [];
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



export interface IfarCinemaProps { }

export const FarCinema: React.FunctionComponent<IfarCinemaProps> = (props: React.PropsWithChildren<IfarCinemaProps>) => {
  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [selectedSeat, setSelectedSeat] = useState<any>(null);
  const [contactInfo, setContactInfo] = useState(null);
  const fetch = require('node-fetch');

  React.useEffect(() => {

    const url = 'https://api.themoviedb.org/3/discover/movie';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTI2NjU4NjQ0OTZlOTVmYjE0NTNlNzUwOGY0NTFlYiIsInN1YiI6IjY0YzIyY2JkMWNmZTNhMGViNDI5YTg4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.V1CtXghYLp-YSf3uiV7rkyapbmuN7xAlT9LoSt5zPvw'
      }
    };
    fetch(url, options)
      .then((res: any) => res.json())
      .then((json: any) => setMovies(json.results))
      .catch((err: any) => console.error('error:' + err));

  }, [])

  // const handleMovieSelect = (movie: any) => {
  //   setSelectedMovie(movie);
  //   setSelectedDate(null);
  //   setSelectedSeat(null);
  //   setContactInfo(null);
  // };

  // const handleDateSelect = (date: Date) => {
  //   setSelectedDate(date);
  //   setSelectedSeat(null);
  //   setContactInfo(null);
  // };

  const handleSeatSelect = (seat: string) => {
    setSelectedSeat(seat);
    setContactInfo(null);
  };

  const handleFormSubmit = (data: any) => {
    setContactInfo(data);
  };
  const farClass = `.simplebar-content-wrapper`
  const ele: any = document.querySelector(farClass);
  let isDown = false;
  let startX: number;
  let scrollLeft: number;
  ele?.addEventListener('mousedown', (e: any) => {
    isDown = true;
    // ele.classList.add('active');
    startX = e.pageX - ele.offsetLeft;
    scrollLeft = ele.scrollLeft;
  });
  ele?.addEventListener('mouseleave', () => {
    isDown = false;
    // ele.classList.remove('active');
  });
  ele?.addEventListener('mouseup', () => {
    isDown = false;
    // ele.classList.remove('active');
  });
  ele?.addEventListener('mousemove', (e: any) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - ele.offsetLeft;
    const walk = (x - startX) * 1; //scroll-fast
    ele.scrollLeft = scrollLeft - walk;
    console.log(walk);
  });
  return (
    <div className={farDesign.FarCinema}>
      <div className={farDesign.header}>
        <h1>hvad skal du se i aften?</h1>
      </div>
      {!selectedMovie && <ScrollContainer>
        {movies.map((movie: IMovie) => {
          return <Movie Movie={movie} selected={false} onMovieSelect={setSelectedMovie} />
        }
        )}
      </ScrollContainer>}
      {selectedMovie && <Movie Movie={selectedMovie} selected={true} onDateSelect={setSelectedDate} selectedDate={selectedDate} onSeatSelect={setSelectedSeat} />}
      {selectedMovie && <div style={{ display: "flex", flexDirection: "column", textAlign: "center", alignItems: "center",  width: "100%", padding: 10, gap: 5 }}>Fortrudt valg af film?
        <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 10}} onClick={e => setSelectedMovie(null)}>
          <Button variant='contained' style={{display: "flex", gap: 10}}><FaLongArrowAltLeft /> <div>Vælg en anden film i stedet</div></Button>
        </div>
      </div>}
      {movies.length > 0 && !selectedMovie && <div className={[farDesign.movieHelper, 'animate__animated animate__shakeX'].join(' ')}><FaLongArrowAltLeft />Træk til siden for at se andre film <FaLongArrowAltRight /></div>}
      {/* {!selectedMovie && <MovieList movies={movies} onSelect={handleMovieSelect} />} */}
      {/* {selectedMovie && !selectedDate && (
        <DateSelection
          movie={selectedMovie}
          onSelect={handleDateSelect}
          availableDates={["1", "2", "3"]}
        />
      )} */}
      {/* {selectedMovie && selectedDate && !selectedSeat && (
        <SeatMap
          movie={selectedMovie}
          date={selectedDate}
          onSelect={handleSeatSelect}
          bookedSeats={['A1', 'B5']} // Fictional data for booked seats
        />
      )} */}
      {/* {selectedMovie && selectedDate && selectedSeat && !contactInfo && (
        <ContactForm onSubmit={handleFormSubmit} />
      )} */}
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
};