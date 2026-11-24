"use client";

import { Menu, Phone, X } from "lucide-react";
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
        <a className="brand" href="/" aria-label="Lauxirio home">LAUXIRIO</a>
        <nav className={menuOpen ? "nav-links open" : "nav-links"} aria-label="Main navigation">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
        </nav>
        <a className="nav-book" href="/booking">Book appointment</a>
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
            <a className="brand footer-brand" href="/">LAUXIRIO</a>
            <p>Beauty, considered differently.</p>
          </div>
          <div className="footer-column">
            <p>Visit</p>
            <address>128 Atelier Avenue<br />Design District, New York</address>
          </div>
          <div className="footer-column">
            <p>Contact</p>
            <a href="tel:+12125550148">+1 212 555 0148</a>
            <a href="mailto:hello@lauxirio.com">hello@lauxirio.com</a>
            <a href="https://wa.me/12125550148" target="_blank" rel="noreferrer"><Phone size={14} /> WhatsApp</a>
          </div>
          <div className="footer-column">
            <p>Hours</p>
            <span>Tuesday—Friday 09:30—19:30</span>
            <span>Saturday 09:00—18:00</span>
            <span>Sunday—Monday Closed</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Lauxirio</span>
          <div>
            <a href="/privacy">Privacy</a>
            <a href="/booking">Booking information</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">Instagram</a>
          </div>
        </div>
      </footer>
    </>
  );
}
