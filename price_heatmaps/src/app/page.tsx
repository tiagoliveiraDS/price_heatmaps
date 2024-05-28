import SearchBar from "./components/SearchBar/SearchBar";
import styles from "./page.module.css";
import Image from "next/image";


export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.h1}>Price Heatmap</h1>
      <div className={styles.searchBar}><SearchBar /></div>
      <Image src="/heatmap.png" alt="Heatmap" fill />
    </main>
  );
}
