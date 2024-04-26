'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./SearchBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar() {
    const [searchQuery, setSearch] = useState("");
    const router = useRouter();

    const onSearch = (event: React.FormEvent) => {
        event.preventDefault();

        const encodedQuery = encodeURI(searchQuery);

        router.push(`/search?q=${encodedQuery}`);
    };

    return (
        <form className={styles.form} onSubmit={onSearch}>
            <button className={styles.button} onClick={onSearch}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
            <input
                className={styles.searchbar}
                type="search"
                value={searchQuery}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Onde? (Distrito ou Concelho ou Freguesia)"
            ></input>
            
        </form>
    );
}