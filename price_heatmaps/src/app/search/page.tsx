'use client'; 

import { useSearchParams } from "next/navigation";
import Map from "../components/Map/Map";
import { useEffect, useState } from "react";
import useSWR from "swr";

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

    const {data, isLoading} = useSWR(`api/search?q=${encodedQuery}`, getData);

    return (
        <div>
            Ola
        </div>
    );
}