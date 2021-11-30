import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import { useEffect, useState } from "react"
import styles from "../styles/Home.module.scss"

interface PelangganType {
  _id: number
  nama: string
  alamat: string
  telepon: number
  paket: number
  pemasangan: Date
  batasPembayaran: Date
}

const search = async (query: number): Promise<PelangganType | null> => {
  try {
    const response = await fetch(
      "http://localhost:3000/api/v1/search/" + query,
      {
        method: "GET",
        credentials: "include",
      }
    )
    const data = await response.json()
    return data as PelangganType
  } catch (error) {
    return null
  }
}

const Home: NextPage = () => {
  const [query, setQuery] = useState<number | null>(null)
  const [result, setResult] = useState<PelangganType | null | 0>(0)
  useEffect(() => {
    if (query) search(query).then(setResult)
  }, [query])
  return (
    <div className={styles.container}>
      <Head>
        <title>INDES</title>
        <meta name="description" content="Indes Wifi App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <a href="http://localhost:3000/api/v1/admin/oauth">
        <button>Login admin</button>
      </a>
      <input
        type="number"
        onChange={(e) => {
          setQuery(+e.target.value)
        }}
        placeholder="Masukan nomer telpon atau id pelanggan mu"
      />
      <div className={styles.result}>
        {result === null && <div>Hasil tidak ditemukan</div>}
        {!!result && <div>{result.nama}</div>}
      </div>
    </div>
  )
}

export default Home
