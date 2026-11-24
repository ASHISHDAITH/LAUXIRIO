"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, X } from "lucide-react";

const services = [
  {
    number: "01",
    category: "Hair",
    title: "Cuts & Styling",
    text: "Precision shapes, effortless movement and a style entirely your own.",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85",
  },
  {
    number: "02",
    category: "Color",
    title: "Color Atelier",
    text: "Dimensional, luminous color designed in light and tailored to you.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85",
  },
  {
    number: "03",
    category: "Beauty",
    title: "Beauty Rituals",
    text: "Skin, makeup and finishing rituals for the quietest kind of confidence.",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1200&q=85",
  },
  {
    number: "04",
    category: "Hair",
    title: "Hair & Scalp Therapy",
    text: "Restorative scalp care, hydrating masks and polished finish.",
    image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=85",
  },
  {
    number: "05",
    category: "Grooming",
    title: "Grooming Ritual",
    text: "Contemporary cuts and beard architecture, shaped with intention.",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=85",
  },
  {
    number: "06",
    category: "Bridal",
    title: "Occasion & Bridal",
    text: "A complete, calm beauty direction for weddings and celebrations.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
  },
];

const gallery = [
  ["https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=900&q=85", "Hair", "portrait"],
  ["https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=900&q=85", "Makeup", "landscape"],
  ["https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=85", "Bridal", "portrait"],
  ["https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=85", "Grooming", "landscape"],
  ["https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=900&q=85", "Hair", "portrait"],
  ["https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=85", "Makeup", "portrait"],
] as const;

const serviceFilters = ["All", "Hair", "Color", "Beauty", "Grooming", "Bridal"];
const galleryFilters = ["All", "Hair", "Makeup", "Bridal", "Grooming"];

export function ServiceExplorer() {
  const [filter, setFilter] = useState("All");
  const visible = filter === "All" ? services : services.filter((service) => service.category === filter);

  return (
    <section className="services section" id="services">
      <div className="section-heading">
        <div><p className="eyebrow">The menu</p><h2>Signature <em>services</em></h2></div>
        <p>Created for individuality, delivered with precision.</p>
      </div>
      <div className="service-tabs" aria-label="Filter services">
        {serviceFilters.map((category) => (
          <button
            key={category}
            className={filter === category ? "active" : ""}
            aria-pressed={filter === category}
            onClick={() => setFilter(category)}
          >
            {category}
            <span>{category === "All" ? "06" : String(services.filter((service) => service.category === category).length).padStart(2, "0")}</span>
          </button>
        ))}
      </div>
      <div className="service-list">
        {visible.map((service) => (
          <article className="service-row" key={service.title}>
            <span className="service-number">{service.number}</span>
            <div className="service-image"><Image src={service.image} alt={`${service.title} concept`} fill sizes="(max-width: 700px) 85vw, 210px" /></div>
            <div className="service-detail"><h3>{service.title}</h3><p>{service.text}</p></div>
            <div className="service-meta"><span>By consultation</span><small>Duration confirmed on request</small></div>
            <Link className="round-link" href="/booking" aria-label={`Request ${service.title}`}><ArrowRight /></Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export function GalleryExplorer() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const visible = filter === "All" ? gallery : gallery.filter((item) => item[1] === filter);

  useEffect(() => {
    if (lightbox === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightbox]);

  return (
    <>
      <section className="gallery section" id="gallery">
        <div className="section-heading gallery-heading">
          <div><p className="eyebrow">Selected work</p><h2>The <em>journal</em></h2></div>
          <div className="filters" aria-label="Filter gallery">
            {galleryFilters.map((category) => (
              <button
                key={category}
                className={filter === category ? "active" : ""}
                aria-pressed={filter === category}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="gallery-grid">
          {visible.map((item, index) => (
            <button
              className={`gallery-item ${item[2]}`}
              key={item[0]}
              onClick={() => setLightbox(index)}
              aria-label={`Open ${item[1]} editorial concept image`}
            >
              <Image src={item[0]} alt={`${item[1]} editorial concept image`} fill sizes="(max-width: 700px) 50vw, 33vw" />
              <span>{item[1]}</span>
            </button>
          ))}
        </div>
      </section>
      {lightbox !== null && visible[lightbox] && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery image">
          <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close gallery"><X /></button>
          <div className="lightbox-image">
            <Image src={visible[lightbox][0]} alt={`${visible[lightbox][1]} editorial concept image`} fill sizes="90vw" />
          </div>
        </div>
      )}
    </>
  );
}
