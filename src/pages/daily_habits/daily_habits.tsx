import { Title } from "@/components/communs/title"
import Head from "next/head"
import Link from "next/link"

export default function Daily() {
    return (
    <>
    <Head>
        <title>Daily Habits</title>
    </Head>
    <div>
        <Title><span>Your daily habits</span></Title>

        
        <Link href="/">Home</Link>
    </div>
    </>
    )
}