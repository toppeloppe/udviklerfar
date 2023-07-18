import { createClient } from 'pexels';
import { useState, useEffect } from 'react';
import { PEXEL_API_KEY } from './key';
import { CountriesStrings } from './Countries';
import { Badge, Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from '@mui/material';

const client = createClient(PEXEL_API_KEY);
export default function useTravelBoxes(Destination: any) {
    const [travelBoxes, setTravelBoxes] = useState<any[]>([]);
    const [boxesLoading, setLoading] = useState("true");



    useEffect(() => {
        async function fetchTravelBoxes() {
            try {
                setLoading("true");
                const boxCount = 3;
                const boxes: any[] = [];
                for (let index = 0; index < boxCount; index++) {
                    const random = Math.round(Math.random() * (CountriesStrings.length - 1))
                    const destination = CountriesStrings[random];
                    const country = await getCountry(destination)
                    // country.index = index;
                    boxes.push(createTravelBox(country, index));
                }

                setTravelBoxes(boxes)
                setLoading("false");

            } catch (error) {
            setLoading("null");
        }
    }

        if (Destination == "") {
        fetchTravelBoxes();
    }
}, []);

return [travelBoxes, boxesLoading];
}

const createTravelBox = (destination: any, index: number) => {
    const discount = randomIntFromInterval(40, 60)
    const oldPrice = randomIntFromInterval(8000, 35000);
    const price = oldPrice * (discount / 100);

    return <Card sx={{ minWidth: 275 }} >
      <CardMedia
        component="img"
        height="150"
        image={destination.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {destination.name}
        </Typography>
        <Stack direction="row" gap={"1.5rem"}>
          <Badge color="secondary" badgeContent={`${discount}%`} >
            <Typography variant="subtitle1" fontWeight={"bold"}>
              {price.toLocaleString('da-dk')} DKK
            </Typography>
          </Badge>

          <Typography variant="subtitle1" style={{ textDecoration: "line-through" }}>
            {oldPrice.toLocaleString('da-dk')} DKK
          </Typography>
        </Stack>

        <Typography variant="body2" color="text.secondary">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis, sit a eveniet commodi autem maxime.
        </Typography>
        <CardActions sx={{ padding: 0, paddingTop: "1rem" }}>
          <Button variant='outlined'>Vælg denne rejse</Button>
        </CardActions>
      </CardContent>

    </Card>
   
  }

const getCountry: any = async (country: string) => {
    const image = await client.photos.search({ query: country, per_page: 1, orientation: 'portrait', page: 0 }).then((res: any) => {
        return res.photos[0]?.src?.original
    })
    return {
        name: country,
        image
    }
}

export const randomIntFromInterval = (min: number, max: number) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }