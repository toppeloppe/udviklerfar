import * as React from 'react';

export interface IDateSelectionProps {
  onSelect: (date: any) => void
  availableDates: any[]
  movie: any
}

export const DateSelection: React.FunctionComponent<IDateSelectionProps> = (props: React.PropsWithChildren<IDateSelectionProps>) => {
  return (
    <>
<div>
      <h2>Select Date for {props.movie.title}</h2>
      <ul>
        {props.availableDates.map((date) => (
          <li key={date}>
            <button onClick={() => props.onSelect(date)}>{date}</button>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};