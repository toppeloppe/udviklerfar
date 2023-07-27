import * as React from 'react';

export interface ISeatMapProps {
  bookedSeats: any;
  movie: any;
  date: any;
  onSelect: (seat: any) => void
}

export const SeatMap: React.FunctionComponent<ISeatMapProps> = (props: React.PropsWithChildren<ISeatMapProps>) => {
  const rows = ['A', 'B', 'C', 'D', 'E'];
  const seatsPerRow = 6;

  const isSeatBooked = (seat: any) => props.bookedSeats.includes(seat);

  return (
    <div>
      <h2>Select Seat for {props.movie.title} on {props.date}</h2>
      <div className="seat-map">
        {rows.map((row) => (
          <div className="seat-row" key={row}>
            {Array.from({ length: seatsPerRow }, (_, index) => index + 1).map((seatNumber) => {
              const seat = `${row}${seatNumber}`;
              const isBooked = isSeatBooked(seat);

              return (
                <button
                  key={seat}
                  onClick={() => !isBooked && props.onSelect(seat)}
                  disabled={isBooked}
                  className={isBooked ? 'booked' : ''}
                >
                  {seat}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};