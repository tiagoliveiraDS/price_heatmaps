'use client';

import { useSearchParams } from "next/navigation";
import DataMap from "../components/Map/Map";
import styles from "./page.module.css";
import SearchBar from "../components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { useDependencies } from "../../dependencies.context";

export default function SearchPage() {
    const { propertyService } = useDependencies()
    const search = useSearchParams();
    const searchQuery = search ? search.get("q") : null;
    const encodedQuery = encodeURI(searchQuery || "")

    const [fetchedData, setFetchedData] = useState<any>();

    useEffect(() => {
        propertyService.listPropertiesInLocation(encodedQuery)
            .then((data) => {
                setFetchedData(data)})
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [search]);

    return (
        <div className={styles.main}>
            <div className={styles.searchBar}>
                <SearchBar />
            </div>
            {!fetchedData ? <Loading/> : 
                <div className={styles.map} data-testid="data-map">
                    <DataMap properties={fetchedData} />
                </div>
            }
        </div>
    );
}