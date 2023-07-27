import * as React from 'react';
import farDesign from './farCinema.module.scss'
import { IMovie } from '../../Models/iMovie';
import { DateSelection } from './DateSelection';
import { SeatMap } from './SeatMap';

export type IMovieListProps = {
  Movie: IMovie;
} & ({
  selected: false;
  onMovieSelect: (movie: IMovie) => void
} | {
  selected: true;
  onDateSelect: (date: Date) => void
  onSeatSelect: (seat: string) => void
  selectedDate: Date;
})

export const Movie: React.FunctionComponent<IMovieListProps> = (props: React.PropsWithChildren<IMovieListProps>) => {
  const currentMovie = props.Movie
  return (
    <>
      {!props.selected && <div className={farDesign.movie} onClick={e => props.onMovieSelect(currentMovie)}>
        <img className={farDesign.moviePoster} width={250} src={'https://image.tmdb.org/t/p/original/' + currentMovie.poster_path} />
        <p className={farDesign.movieInfo}>
          {currentMovie.title}
        </p>

      </div>}
      {props.selected &&
        <div className={[farDesign.movie, farDesign.movieSelected].join(' ')}>
          <div style={{ display: "flex", flexDirection: "row", gap: 20, position: "relative", width: "100%", height: "100%" }}>
            <img className={farDesign.moviePoster}  src={'https://image.tmdb.org/t/p/original/' + currentMovie.poster_path} />
            <div style={{ display: "flex", flexDirection: "column", gap: 20, width: "100%", overflow: "auto" }}>
              <p className={farDesign.movieInfo}>
                {currentMovie.title}
              </p>
              <div style={{ display: "flex", flexDirection: "column"}}>
                {/* <div style={{ width: "33%" }}> */}
                  <DateSelection availableDates={[1, 2, 3]} movie={props.Movie} onSelect={props.onDateSelect} />
                {/* </div> */}
                {props.selectedDate && <div style={{ width: "100%", justifyContent: "center", display: "flex" }}>
                  <SeatMap movie={props.Movie} date={props.selectedDate} bookedSeats={['A1', 'B5']} onSelect={props.onSeatSelect}/>
                </div>}
              </div>
            </div>
          </div>
        </div>}
    </>
  );
};