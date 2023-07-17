// import { useState, useEffect } from 'react';
// import { CountriesStrings } from './Countries';
// import { PEXEL_API_KEY } from './key';
// import { createClient } from 'pexels';
// import { Badge, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Stack, Typography } from '@mui/material';

export const CountriesStrings: string[] = [
  "Paris",
  "Rome",
  "London",
  "England",
  "Amsterdam",
  "Barcelona",
  "Florence",
  "Prague",
  "Venice",
  "Athens",
  "Mallorca",
  "Vienna",
  "Santorini",
  "Seville",
  "Madrid",
  "Porto",
  "Stockholm",
  "Lisbon",
  "Budapest",
  "Berlin",
  "Reykjavik",
  "Canary Islands",
  "Amalfi Coast",
  "Tromsø",
  "Vatican",
  "Dubrovnik",
  "Canary",
  "London",
  "Munich",
  "Monaco",
  "Oxford",
  "Amalfi",
  "Dublin",
  "Santa",
  "Milan",
  "Meteora",
  "Krka",
  "Bologna",
  "Brussels",
  "Pompeii",
  "Andorr",
  "Manchester",
  "Azores",
  "Loire",
  "Lake",
  "Cinque",
  "Faroe",
  "Krakow",
  "Pisa",
  "Malaga",
  "Bran",
  "Kravica",
  "Keukenhof",
  "Versailles",
  "Riga",
  "Granada",
  "Kiruna",
  "Frankfurt",
  "Capri",
  "Greek",
  "Plitvice",
  "Belgrade",
  "Trolltunga",
  "Ibiza",
  "Geneva",
  "Sofia",
  "Ljubjana",
  "Copenhagen",
  "Mont",
  "Helsinki",
  "The",
  "Edinburgh",
  "Bratislava",
  "Mycenae",
  "Salzburg",
  "Rhine",
  "Oslo",
  "Blue",
  "Corsica",
  "Canyon",
  "Belfast",
  "Palermo",
  "Warsaw",
  "Golden",
  "Lyon",
  "Sarajevo",
  "Bordeaux",
  "Madeira",
  "Alps",
  "Vilnius",
  "Stonehenge",
  "Postojna",
  "Isle",
  "Neuschwanstein",
  "Durmitor",
  "Malta",
  "Vatnajökull",
  "Tallinn",
  "Brighton",
  "Þingvellir",
  "Champagne",
  "Zurich",
  "Verona",
  "Liverpool",
  "Valencia",
  "Istanbul"
]

// export default function useCountries() {
//   //   const [value, setValue] = useState('');
//   const [Countries, setCountries] = useState<any>([])
//   const [travelBoxes, setTravelBoxes] = useState<any[]>([])
//   const [background, setBackground] = useState<any>("")
//   let box = false;
//   let bVideo = false;

//   const client = createClient(PEXEL_API_KEY);

//   useEffect((): any => {
//     let boxesLoaded = [];
//     const fetchTravelboxes = async () => {
      
//       const boxCount = 3;
//       const boxes: any[] = [];
//       for (let index = 0; index < boxCount; index++) {
//         const random = Math.round(Math.random() * (CountriesStrings.length - 1))
//         const destination = CountriesStrings[random];
//         const country = await getCountry(destination);
//         boxes.push(createTravelBox(country, index));
//       }

//       setTravelBoxes(boxes)
//     }
//     void fetchTravelboxes();
//     return () => boxesLoaded = [];
    
//   }, [])

//   useEffect((): any => {
//     let videoLoaded = "";

//     const fetchBackgroundvideo = async () => {
//       if (bVideo) return [];
//       bVideo = true

//       const query = "Travel";
//       const video = await client.videos.search({ query, per_page: 1, page: 1 }).then((res: any) => {
//         return res.videos[0].video_files.find((vf: any) => vf.quality == "hd").link
//       });
//       setBackground(video)
//       return null;

//     }
//     void fetchBackgroundvideo();
//     return () => videoLoaded = "";

//   }, [])

//   const getCountry: any = async (country: string) => {
//     const query = country;
//     const image = await client.photos.search({ query, per_page: 1, orientation: 'portrait', page: 0 }).then((res: any) => {
//       return res.photos[0]?.src?.original
//     })
//     return {
//       name: country,
//       image
//     }
//   }

//   const createTravelBox = (destination: any, index: number) => {
//     const discount = randomIntFromInterval(40, 60)
//     const oldPrice = randomIntFromInterval(8000, 35000);
//     const price = oldPrice * (discount / 100);

//     return <Card sx={{ minWidth: 275 }} >
//       <CardMedia
//         component="img"
//         height="194"
//         image={destination.image}
//       />
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
//           {destination.name}
//         </Typography>
//         <Stack direction="row" gap={"1.5rem"}>
//           <Badge color="secondary" badgeContent={`${discount}%`} >
//             <Typography variant="subtitle1" fontWeight={"bold"}>
//               {price.toLocaleString('da-dk')} DKK
//             </Typography>
//           </Badge>

//           <Typography variant="subtitle1" style={{ textDecoration: "line-through" }}>
//             {oldPrice.toLocaleString('da-dk')} DKK
//           </Typography>
//         </Stack>

//         <Typography variant="body2" color="text.secondary">
//           Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis, sit a eveniet commodi autem maxime.
//         </Typography>
//         <CardActions sx={{ padding: 0, paddingTop: "1rem" }}>
//           <Button variant='outlined'>Vælg denne rejse</Button>
//         </CardActions>
//       </CardContent>

//     </Card>
   
//   }
//   const randomIntFromInterval = (min: number, max: number) => { // min and max included 
//     return Math.floor(Math.random() * (max - min + 1) + min)
//   }
//   return {
//     Countries, travelBoxes, background
//   };
// }