import { useState, useEffect } from 'react';
// import { CountriesStrings } from './Countries';
import { PEXEL_API_KEY } from './key';
import { createClient } from 'pexels';

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

export default function useCountries() {
    //   const [value, setValue] = useState('');
    const [Countries, setCountries] = useState<any>([])
    const [travelBoxes, setTravelBoxes] = useState<any[]>([])
    const [background, setBackground] = useState<any[]>([])

    const client = createClient(PEXEL_API_KEY);

    useEffect(() => {
        async function fetchData() {
            const boxCount = 3;
            const boxes: any[] = [];
            for (let index = 0; index < boxCount; index++) {
                const random = Math.round(Math.random() * (CountriesStrings.length - 1))
                const destination = CountriesStrings[random];
                const country = await getCountry(destination);
                boxes.push(createTravelBox(country, index));
            }

            setTravelBoxes(boxes)
        }
        void fetchData();
    }, [])

    useEffect(() => {
        async function fetchData() {
            const query = "Travel";
            const video = await client.videos.search({ query, per_page: 2, page: 1 }).then((res: any) => {
                return res.videos[1].video_files.find((vf: any) => vf.quality == "hd").link
            });
            setBackground(video)
        }
        fetchData();
    }, []);

    const getCountry: any = async (country: string) => {
        const query = country;
        const image = await client.photos.search({ query, per_page: 1, orientation: 'portrait', page: 0 }).then((res: any) => {
            return res.photos[0]?.src?.original
        })
        return {
            name: country,
            image
        }
    }

    const createTravelBox = (destination: any, index: number) => {
        // const test = CountriesStrings;
    
        // const random = Math.round(Math.random() * (CountriesStrings.length - 1))
        // const destination = CountriesStrings[random]
        // const test2 = test[random * test.length]
        const discount = randomIntFromInterval(40, 60)
        const oldPrice = randomIntFromInterval(8000, 35000);
        const price = oldPrice * (discount / 100);
        // const image = await useCountries().getCountry(destination);
        // let image: any = useCountries().getCountry(destination)
        // let image: any = Countries.length > 0 ? Countries.find((c: any) => c.name == destination).image : null;
    
        // if (!image ) return <div>
        //   <MoonLoader color="#36d7b7" />
        // </div>
    
        // return <div>{destination.name}</div>
        return <div className='travelBox' key={index}>
          <img src={destination.image}></img>
          <div className='info'>
            <div className='flex row' style={{ alignItems: "center", justifyContent: 'space-between', paddingBottom: 10 }}>
    
              <div className='flex col'>
                <div className='destination'>{destination.name}</div>
                <div className='flex row gap'>
                  <div className='price'>{price.toLocaleString('da-dk')} DKK </div>
                  <div className='oldPrice'>{oldPrice.toLocaleString('da-dk')} DKK </div>
                </div>
              </div>
              <div className='discount'>{discount}%</div>
            </div>
            <div>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis, sit a eveniet commodi autem maxime.</div>
            <br />
            <button>Læs mere</button>
          </div>
        </div>
      }
      const randomIntFromInterval = (min: number, max: number) => { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
      }
    return {
        Countries, travelBoxes, background
    };
}