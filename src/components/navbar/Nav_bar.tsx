import Link from "next/link";
import React from "react";

const Nav_bar = () => {
  return (
    <div className="top_nav">
      <div className="image"></div>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/tracking">Tracking my habits</Link>
        <button>New Habit</button>
      </nav>
    </div>
  );
};

export default Nav_bar;