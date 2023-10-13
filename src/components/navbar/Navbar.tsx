import Link from "next/link";
import React, { ReactNode } from "react";
import Button from "../communs/button";

interface LayoutProps{
  children: ReactNode;
}

export const Navbar = ({children}: LayoutProps) => {
  return (
    <>
    <div className="top_nav">
        <h1>Power Habits</h1>
      <nav>
        <Link href="/" className="text_link">Home</Link>
        <Link href="/daily_habits/daily_habits"className="text_link">Tracking my habits</Link>
        <Button><Link href="/new_habbit/new_habit">+ New Habit</Link></Button>
      </nav>
    </div>
    {children}
    </>
  );
};
;