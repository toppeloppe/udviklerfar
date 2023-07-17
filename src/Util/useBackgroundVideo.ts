import { createClient } from 'pexels';
import { useState, useEffect } from 'react';
import { PEXEL_API_KEY } from './key';

const client = createClient(PEXEL_API_KEY);
export default function useBackgroundVideo(Destination: any) {
    const [video, setVideo] = useState("");
    const [loading, setLoading] = useState("false");



    useEffect(() => {
        async function fetchBackgroundVideo() {
            try {
                setLoading("true");
                const response = await client.videos.search({ query: Destination, per_page: 1, page: 1 }).then((res: any) => {
                    return res.videos[0].video_files.find((vf: any) => vf.quality == "hd").link
                });
                // console.log(json);
                setVideo(response);
            } catch (error) {
                setLoading("null");
            }
        }

        if (Destination !== "") {
            fetchBackgroundVideo();
        }
    }, [Destination]);

    return [video, loading];
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