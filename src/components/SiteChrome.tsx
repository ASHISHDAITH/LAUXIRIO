"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  ["Home", "/"],
  ["About", "/about"],
  ["Services", "/services"],
  ["Gallery", "/gallery"],
  ["Artists", "/artists"],
  ["Experience", "/experience"],
  ["Contact", "/contact"],
];

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <>
      <header className={scrolled ? "nav-wrap scrolled" : "nav-wrap"}>
        <Link className="brand" href="/" aria-label="Lauxirio home">LAUXIRIO</Link>
        <nav className={menuOpen ? "nav-links open" : "nav-links"} aria-label="Main navigation">
          {links.map(([label, href]) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</Link>
          ))}
        </nav>
        <Link className="nav-book" href="/booking">Book appointment</Link>
        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>
      {children}
      <footer id="contact">
        <div className="footer-main">
          <div>
            <Link className="brand footer-brand" href="/">LAUXIRIO</Link>
            <p>Beauty, considered.</p>
          </div>
          <div className="footer-column">
            <p>Studio</p>
            <span>Location details will be published after verification.</span>
          </div>
          <div className="footer-column">
            <p>Appointments</p>
            <Link href="/booking">Request an appointment</Link>
            <Link href="/contact">Contact information</Link>
          </div>
          <div className="footer-column">
            <p>Hours</p>
            <span>Schedule details will be published after verification.</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Lauxirio</span>
          <div>
            <Link href="/privacy">Privacy</Link>
            <Link href="/booking">Booking information</Link>
            <Link href="/journal">Journal</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
