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
        <Link href="/tracking"className="text_link">Tracking my habits</Link>
        <Button><div>+ New Habit</div></Button>
      </nav>
    </div>
    {children}
    </>
  );
};
;