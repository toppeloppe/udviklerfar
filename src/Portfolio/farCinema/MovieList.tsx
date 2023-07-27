import * as React from 'react';

export interface IMovieListProps {
  movies: any[];
  onSelect: (movie: string) => void
 }

export const MovieList: React.FunctionComponent<IMovieListProps> = (props: React.PropsWithChildren<IMovieListProps>) => {
  return (
    <>
      <div>
        <h2>Movie List</h2>
        <ul>
          {props.movies.map((movie) => (
            <li key={movie.id}>
              <button onClick={() => props.onSelect(movie)}>{movie.title}</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};