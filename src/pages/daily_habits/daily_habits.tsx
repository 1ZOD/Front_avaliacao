import Nav_bar from "@/components/navbar/Nav_bar"
import Head from "next/head"
import Link from "next/link"

export default function Daily() {
    return (
    <>
    <Head>
        <title>Daily Habits</title>
    </Head>
    <Nav_bar></Nav_bar>
    <div>
        <h1> Contatos</h1>
        <Link href="/">Home</Link>
    </div>
    </>
    )
}