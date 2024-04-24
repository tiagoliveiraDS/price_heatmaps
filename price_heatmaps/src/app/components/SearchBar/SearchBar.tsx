'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./SearchBar.module.css";

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
            <input
                className={styles.searchbar}
                type="text"
                value={searchQuery}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Onde?"
            />
        </form>
    );
}