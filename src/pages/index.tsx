import HomePageContent from "@/components/home/home_component";
import HomePageTile from "@/components/home/home_title";
import Head from "next/head";


const Home = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <main>
        
        <HomePageTile/>
        <HomePageContent></HomePageContent>
      </main>
    </>
  )
}

export default Home;