import { createClient } from 'pexels';
import { useState, useEffect } from 'react';
import { PEXEL_API_KEY } from './key';

const client = createClient(PEXEL_API_KEY);
export default function useTopImage(Destination: any) {
    const [topImage, setVideo] = useState("");
    const [loading, setLoading] = useState("false");



    useEffect(() => {
        async function fetchTopImage() {
            try {
                setLoading("true");
                const response = await getCountry(Destination);
                // console.log(json);
                setVideo(response.image);
            } catch (error) {
                setLoading("null");
            }
        }

        if (Destination !== "") {
            fetchTopImage();
        }
    }, [Destination]);

    return [topImage, loading];
}

const getCountry: any = async (country: string) => {
    const image = await client.photos.search({ query: country, per_page: 3, orientation: 'portrait', page: 0 }).then((res: any) => {
        return res.photos[2]?.src?.original
    })
    return {
        name: country,
        image
    }
}