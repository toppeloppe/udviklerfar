import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Forside } from './Forside';
import reportWebVitals from './reportWebVitals';
// import useCountries from './Util/Countries';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { FarTravels } from './Portfolio/farTravels/farTravels';
import App, { FarCinema } from './Portfolio/farCinema/farCinema';
// import { FarTravels } from './Portfolio/farTravels/farTravels';
const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: "/",
    element: <Forside />
  },
  {
    path: "/farTravels",
    element: <FarTravels />
  },
  {
    path: "/farCinema",
    element: <FarCinema />
  }
]);

root.render(
  <React.StrictMode>
    
    <RouterProvider router={router} />
  </React.StrictMode>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
