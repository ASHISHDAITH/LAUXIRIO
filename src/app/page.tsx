"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowRight, X } from "lucide-react";
import BookingForm from "@/components/BookingForm";
import { Suspense } from "react";

const BeautyScene = dynamic(() => import("@/components/BeautyScene"), {
  ssr: false,
  loading: () => <div className="scene-loading" aria-hidden="true" />,
});

const services = [
  {
    number: "01",
    category: "Hair",
    title: "Cuts & Styling",
    text: "Precision shapes, effortless movement and a style entirely your own.",
    price: "From $85",
    duration: "60–90 min",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85",
  },
  {
    number: "02",
    category: "Color",
    title: "Color Atelier",
    text: "Dimensional, luminous color designed in light and tailored to you.",
    price: "From $140",
    duration: "150–240 min",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85",
  },
  {
    number: "03",
    category: "Beauty",
    title: "Beauty Rituals",
    text: "Skin, makeup and finishing rituals for the quietest kind of confidence.",
    price: "From $95",
    duration: "60–120 min",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1200&q=85",
  },
  {
    number: "04",
    category: "Hair",
    title: "Hair & Scalp Therapy",
    text: "Restorative scalp care, hydrating masks and polished finish.",
    price: "From $110",
    duration: "75–120 min",
    image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=85",
  },
  {
    number: "05",
    category: "Grooming",
    title: "Grooming Ritual",
    text: "Contemporary cuts and beard architecture, shaped with intention.",
    price: "From $70",
    duration: "45–75 min",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=85",
  },
  {
    number: "06",
    category: "Bridal",
    title: "Occasion & Bridal",
    text: "A complete, calm beauty direction for weddings and celebrations.",
    price: "From $220",
    duration: "From 180 min",
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
];

const experts = [
  ["https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=85", "Amelia Noir", "Creative Director", "Editorial color · Modern cutting"],
  ["https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=85", "Leon Vale", "Master Grooming Artist", "Precision cuts · Beard design"],
  ["https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=85", "Maya Laurent", "Beauty & Makeup Artist", "Bridal · Skin · Occasion makeup"],
];

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState("All");
  const [serviceFilter, setServiceFilter] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
    };
    const loader = window.setTimeout(() => setLoaded(true), 850);
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(loader);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const visibleGallery =
    galleryFilter === "All" ? gallery : gallery.filter((item) => item[1] === galleryFilter);
  const visibleServices =
    serviceFilter === "All" ? services : services.filter((item) => item.category === serviceFilter);

  return (
    <>
      {!loaded && (
        <div className="preloader" aria-hidden="true">
          <span>Lauxirio</span>
          <i />
        </div>
      )}
      <main id="top">
        <section className="hero">
          <div className="hero-photo" aria-hidden="true" />
          <div className="hero-grain" aria-hidden="true" />
          <div className="hero-content">
            <p className="eyebrow">Luxury hair & beauty · Unisex</p>
            <h1>Beauty,<br /><em>considered.</em></h1>
            <p className="hero-copy">An intimate salon for extraordinary hair, beauty and personal transformation.</p>
            <div className="hero-actions">
              <a className="primary-button" href="#booking">Book your appointment</a>
              <a className="text-link" href="#services">Explore services <ArrowRight size={15} /></a>
            </div>
              <div className="hero-rail" aria-label="Salon highlights">
                <span><strong>01</strong> artist-led</span>
                <span><strong>02</strong> private ritual</span>
                <span><strong>03</strong> lasting finish</span>
              </div>
          </div>
          <div className="hero-3d"><BeautyScene /></div>
          <a className="scroll-cue" href="#story" aria-label="Scroll to our story"><span>Discover</span><ArrowDown size={16} /></a>
        </section>

        <section className="story section" id="story">
          <div className="story-index">01 / Philosophy</div>
          <div className="story-heading">
            <p className="eyebrow">The Lauxirio philosophy</p>
            <h2>Not a trend.<br /><em>A point of view.</em></h2>
          </div>
          <div className="story-image">
            <img src="https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=1200&q=85" alt="Luxury salon interior with styling chairs" loading="lazy" />
          </div>
          <div className="story-copy">
            <p className="lead">We believe beauty is most powerful when it feels unmistakably yours.</p>
            <p>Lauxirio brings together exacting technique, intuitive artistry and genuine care. Every cut, color and ritual begins with listening.</p>
            <a className="text-link dark-link" href="#experts">Meet our artists <ArrowRight size={15} /></a>
          </div>
        </section>

        <section className="services section" id="services">
          <div className="section-heading">
            <div><p className="eyebrow">The menu</p><h2>Signature <em>services</em></h2></div>
            <p>Created for individuality, delivered with precision.</p>
          </div>
          <div className="service-tabs" aria-label="Filter services">
            {["All", "Hair", "Color", "Beauty", "Grooming", "Bridal"].map((filter) => (
              <button key={filter} className={serviceFilter === filter ? "active" : ""} onClick={() => setServiceFilter(filter)}>
                {filter}
                <span>{filter === "All" ? "06" : String(services.filter((item) => item.category === filter).length).padStart(2, "0")}</span>
              </button>
            ))}
          </div>
          <div className="service-list">
            {visibleServices.map((service) => (
              <article className="service-row" key={service.title}>
                <span className="service-number">{service.number}</span>
                <div className="service-image"><img src={service.image} alt={service.title} loading="lazy" /></div>
                <div className="service-detail"><h3>{service.title}</h3><p>{service.text}</p></div>
                <div className="service-meta"><span>{service.price}</span><small>{service.duration}</small></div>
                <a className="round-link" href="#booking" aria-label={`Book ${service.title}`}><ArrowRight /></a>
              </article>
            ))}
          </div>
        </section>

        <section className="immersive">
          <div className="immersive-copy">
            <p className="eyebrow">Sculpted for you</p>
            <h2>Every detail,<br /><em>in balance.</em></h2>
            <p>Move through form. Discover a beauty experience shaped around proportion, texture and the person in the chair.</p>
            <a className="text-link" href="#booking">Begin your ritual <ArrowRight size={15} /></a>
          </div>
          <div className="immersive-orb" aria-hidden="true">
            <div className="orb-ring ring-one" /><div className="orb-ring ring-two" /><div className="orb-core" />
          </div>
        </section>

        <section className="gallery section" id="gallery">
          <div className="section-heading gallery-heading">
            <div><p className="eyebrow">Selected work</p><h2>The <em>journal</em></h2></div>
            <div className="filters" aria-label="Filter gallery">
              {["All", "Hair", "Makeup", "Bridal", "Grooming"].map((filter) => (
                <button key={filter} className={galleryFilter === filter ? "active" : ""} onClick={() => setGalleryFilter(filter)}>{filter}</button>
              ))}
            </div>
          </div>
          <div className="gallery-grid">
            {visibleGallery.map((item, index) => (
              <button className={`gallery-item ${item[2]}`} key={item[0]} onClick={() => setLightbox(index)} aria-label={`Open ${item[1]} gallery image`}>
                <img src={item[0]} alt={`Lauxirio ${item[1].toLowerCase()} work`} loading="lazy" /><span>{item[1]}</span>
              </button>
            ))}
          </div>
        </section>

        {lightbox !== null && (
          <div className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery image">
            <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close gallery"><X /></button>
            <img src={visibleGallery[lightbox]?.[0]} alt="Selected Lauxirio salon work" />
          </div>
        )}

        <section className="experts section" id="experts">
          <div className="section-heading"><div><p className="eyebrow">At your chair</p><h2>Meet the <em>artists</em></h2></div></div>
          <div className="expert-grid">
            {experts.map((expert) => (
              <article className="expert-card" key={expert[1]}>
                <div className="expert-image"><img src={expert[0]} alt={`${expert[1]}, ${expert[2]}`} loading="lazy" /></div>
                <p>{expert[2]}</p><h3>{expert[1]}</h3><span>{expert[3]}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="standard" aria-label="The Lauxirio standard">
          <div className="standard-heading"><p className="eyebrow">The Lauxirio standard</p><h2>Care, in<br /><em>every detail.</em></h2></div>
          <div className="standard-grid">
            <article><span>01</span><h3>Listen first</h3><p>Each appointment begins with your hair, routine and the way you want to feel.</p></article>
            <article><span>02</span><h3>Design precisely</h3><p>Cut, colour and finishing are considered as one coherent, wearable result.</p></article>
            <article><span>03</span><h3>Support the result</h3><p>Clear maintenance guidance helps you preserve the work beyond the chair.</p></article>
          </div>
        </section>

        <section className="pricing section" id="pricing">
          <div className="pricing-heading"><p className="eyebrow">The Lauxirio edit</p><h2>Time for <em>you.</em></h2></div>
          <div className="package-grid">
            <article><p>01 / Signature</p><h3>The New Cut</h3><span>From $85</span><ul><li>Consultation</li><li>Precision cut</li><li>Wash & finish</li></ul><a href="#booking">Reserve <ArrowRight size={14} /></a></article>
            <article className="featured-package"><p>02 / Complete</p><h3>The Lauxirio Ritual</h3><span>From $220</span><ul><li>Hair consultation</li><li>Cut or color</li><li>Beauty finishing</li></ul><a href="#booking">Reserve <ArrowRight size={14} /></a></article>
            <article><p>03 / Occasion</p><h3>The Bridal Edit</h3><span>From $480</span><ul><li>Bridal preview</li><li>Hair & makeup</li><li>Touch-up kit</li></ul><a href="#booking">Reserve <ArrowRight size={14} /></a></article>
          </div>
        </section>

        <section className="booking section" id="booking">
          <div className="booking-intro">
            <p className="eyebrow">Appointment</p><h2>Make time<br />for <em>yourself.</em></h2>
            <p>Share a few details and begin your Lauxirio experience. We’ll use them to prepare for your visit.</p>
            <div className="booking-details"><span>Tuesday—Saturday</span><span>09:30—19:30</span></div>
          </div>
          <Suspense fallback={<div className="booking-form" aria-label="Loading booking form" />}>
            <BookingForm />
          </Suspense>
        </section>
      </main>

    </>
  );
}
