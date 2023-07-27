import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import * as React from 'react';

export interface IDateSelectionProps {
  onSelect: (date: any) => void
  availableDates: any[]
  movie: any
}

export const DateSelection: React.FunctionComponent<IDateSelectionProps> = (props: React.PropsWithChildren<IDateSelectionProps>) => {
  return (
    <>
      <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
        <h2>1. Vælg dato</h2>
        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale='da'>
          <DateCalendar onChange={props.onSelect}></DateCalendar>
        </LocalizationProvider>
      </div>
    </>
  );
};