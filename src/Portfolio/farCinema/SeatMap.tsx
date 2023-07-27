import * as React from 'react';
import { Chair } from './Chair';
import farDesign from './farCinema.module.scss'

export interface ISeatMapProps {
  bookedSeats: any;
  movie: any;
  date: any;
  onSelect: (seat: any) => void
}

export const SeatMap: React.FunctionComponent<ISeatMapProps> = (props: React.PropsWithChildren<ISeatMapProps>) => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const seatsPerRow = 12;

  const isSeatBooked = (seat: any) => props.bookedSeats.includes(seat);

  return (
    <div style={{width: "100%"}}>
      <h2>2. Vælg sæder</h2>
      <div className={farDesign.cinemaWrapper}>
        <div className='cinemaMovie'></div>
        <div className="seat-map" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {rows.map((row) => (
            <div className="seat-row" key={row} style={{ display: "flex", flexDirection: "row", gap: 15 }}>
              {Array.from({ length: seatsPerRow }, (_, index) => index + 1).map((seatNumber) => {
                const seat = `${row}${seatNumber}`;
                const isBooked = isSeatBooked(seat);

                return (
                  // <button
                  //   key={seat}
                  //   onClick={() => !isBooked && props.onSelect(seat)}
                  //   disabled={isBooked}
                  //   className={isBooked ? 'booked' : ''}
                  // >

                  <Chair booked={isBooked} selected={false} onSelect={props.onSelect}/>
                  // </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};