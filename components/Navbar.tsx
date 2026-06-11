"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/tools", label: "Tools" },
    { href: "/pricing", label: "Pricing" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`w-full z-[100] transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-black/50 border-b border-cyan-500/20 shadow-lg shadow-black/30"
          : "backdrop-blur-md bg-black/30 border-b border-cyan-500/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="group">
          <h1 className="text-2xl font-bold text-cyan-400 group-hover:text-cyan-300 transition duration-200">
            Everyday Cyber AI
          </h1>
          <p className="text-xs text-gray-500">IT Support & Cyber Security — Mumbai</p>
        </Link>

        {/* Desktop Menu */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-8 text-sm text-gray-300">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative hover:text-cyan-400 transition duration-300 py-1 ${
                  pathname === link.href ? "text-cyan-400" : ""
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-cyan-400 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          <Link
            href="/contact"
            className="hidden md:block bg-cyan-500 hover:bg-cyan-400 text-black px-5 py-2 rounded-xl font-semibold transition duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/40"
          >
            Request Support
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Toggle menu"
            className="md:hidden text-cyan-400 text-3xl leading-none"
          >
            {mobileMenu ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenu && (
        <div className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-t border-gray-800 md:hidden">
          <div className="flex flex-col p-6 gap-5 text-gray-300 text-lg">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`hover:text-cyan-400 transition ${
                  pathname === link.href ? "text-cyan-400 font-semibold" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="bg-cyan-500 hover:bg-cyan-400 text-black px-5 py-3 rounded-xl font-semibold text-center transition mt-2"
            >
              Request Support
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
