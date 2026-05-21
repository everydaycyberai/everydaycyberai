"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-md bg-black/40 border-b border-gray-800 z-50">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div>

          <Link href="/">
            <h1 className="text-2xl font-bold text-cyan-400 cursor-pointer">
              Everyday Cyber AI
            </h1>
          </Link>

          <p className="text-xs text-gray-400">
            IT Support & Cyber Security Specialist – Mumbai
          </p>

        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6">

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 text-sm text-gray-300">

            <Link
              href="/"
              className="hover:text-cyan-400 transition duration-300"
            >
              Home
            </Link>

            <Link
  href="/services"
  className="hover:text-cyan-400 transition duration-300"
>
  Services
</Link>

            <Link
  href="/tools"
  className="hover:text-cyan-400 transition duration-300"
>
  Tools
</Link>

            <Link
              href="/about"
              className="hover:text-cyan-400 transition duration-300"
            >
              About
            </Link>

            <Link
  href="/contact"
  className="hover:text-cyan-400 transition duration-300"
>
  Contact
</Link>

          </div>

          {/* Request Support Button */}
          <button className="hidden md:block bg-cyan-500 hover:bg-cyan-400 text-black px-5 py-2 rounded-xl font-semibold transition duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/40">
            Request Support
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden text-cyan-400 text-3xl"
          >
            ☰
          </button>

        </div>

      </div>

      {/* Mobile Dropdown */}
      {mobileMenu && (
        <div className="absolute top-20 left-0 w-full bg-black border-t border-gray-800 md:hidden">

          <div className="flex flex-col p-6 gap-6 text-gray-300 text-lg">

            <Link href="/">Home</Link>

            <Link href="/services">Services</Link>

            <Link href="/tools">Tools</Link>

            <Link href="/about">About</Link>

            <Link href="/contact">Contact</Link>

          </div>

        </div>
      )}

    </nav>
  );
}