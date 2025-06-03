import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="py-7 bg-black">
      <nav className="flex justify-center space-x-6">
        <h1 className="text-2xl mr-20">Eric Saez Escalona</h1>
        <Link
          href="/"
          className="text-white text-lg font-semibold hover:underline"
        >
          Movie Explorer
        </Link>
        <Link href="/about" className="text-white text-lg hover:underline">
          About
        </Link>
      </nav>
    </header>
  );
}
