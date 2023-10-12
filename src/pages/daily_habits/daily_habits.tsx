import { Title } from "@/components/communs/title";
import Head from "next/head";
import Link from "next/link";
import MyCalendar from "@/components/calendario/calendario";

export default function Daily() {
  return (
    <>
      <Head>
        <title>Daily Habits</title>
      </Head>
      <div>
        <Title>
          <span>Your daily habits</span>
        </Title>

        <MyCalendar/>
        
        {/* <Link href="/">Home</Link> */}
      </div>
    </>
  );
}
