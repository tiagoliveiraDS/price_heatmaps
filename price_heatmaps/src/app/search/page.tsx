'use client';

import { useSearchParams } from "next/navigation";
import DataMap from "../components/Map/Map";
import useSWR from "swr";
import { Property } from "../models/Property";
import styles from "./page.module.css";
import SearchBar from "../components/SearchBar/SearchBar";
import { Suspense, useEffect, useState } from "react";
import Loading from "../loading";

const SearchPage = () => {
    const search = useSearchParams();
    const searchQuery = search ? search.get("q") : null;
    const encodedQuery = encodeURI(searchQuery || "")


    const [fetchedData, setFetchedData] = useState<any>();

    const { data, isLoading } = useSWR<Property[]>(`api/search?q=${encodedQuery}`, getData)

    useEffect(() => {
        setFetchedData(data)
    }, [data]);

    async function getData(url: string) {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }

        return res.json();
    }

    return (
        <div className={styles.main}>
            <div className={styles.searchBar}>
                <SearchBar />
            </div>
                <div className={styles.map}>
                    <DataMap properties={fetchedData} />
                </div>
        </div>
    );
}

export default SearchPage;