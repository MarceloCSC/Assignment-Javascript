import Head from "next/head";
import styles from "../styles/pages/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Home Page</h1>
      <Link href="/access-requests">{"Marcelo's Assignment"}</Link>
    </div>
  );
}
