import Link from "next/link";
import React from "react";
import Button from "../communs/button";

const Nav_bar = () => {
  return (
    <div className="top_nav">
        <h1>Power Habits</h1>
      <nav>
        <Link href="/" className="text_link">Home</Link>
        <Link href="/tracking"className="text_link">Tracking my habits</Link>
        <Button></Button>
      </nav>
    </div>
  );
};

export default Nav_bar;