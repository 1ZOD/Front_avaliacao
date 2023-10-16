import HomePageContent from "@/components/home/home_component";
import HomePageTile from "@/components/home/home_title";
import Head from "next/head";
import Link from "next/link";


const Home = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <main>
        
        <HomePageTile/>
        <HomePageContent></HomePageContent>
        {/* <Link href="daily_habits/daily_habits">Ir para contatos</Link> */}
      </main>
    </>
  )
}

export default Home;