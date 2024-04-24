'use client'; 

import { useSearchParams } from "next/navigation";
import Map from "../components/Map/Map";
import useSWR from "swr";
import { Property } from "../models/Property";

const getData = async (url: string) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

export default function SearchPage() {
    const search = useSearchParams();
    const searchQuery = search ? search.get("q") : null;
    const encodedQuery = encodeURI(searchQuery || "")

    const {data, isLoading} = useSWR<Property[]>(`api/search?q=${encodedQuery}`, getData);

    if (!data) {
        return <div>Failed to load data</div>;
    }

    return (
        <div className="Map">
            <Map params={{properties: data}} />
        </div>
    );
}