import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import BookingForm from "@/components/BookingForm";
import { Suspense } from "react";

const slugs = ["about", "services", "gallery", "artists", "experience", "booking", "contact", "journal", "privacy"];

export const instant = false;

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Metadata | Promise<Metadata> {
  return params.then(({ slug }) => {
    const labels: Record<string, string> = {
      about: "About the Studio",
      services: "Services & Treatments",
      gallery: "Editorial Lookbook",
      artists: "The Artists",
      experience: "The Salon Experience",
      booking: "Book an Appointment",
      contact: "Contact & Location",
      journal: "Beauty Journal",
      privacy: "Privacy",
    };
    if (!labels[slug]) return {};
    return {
      title: `${labels[slug]} | Lauxirio`,
      description: `${labels[slug]} at Lauxirio — a luxury unisex hair and beauty studio.`,
    };
  });
}

const serviceGroups = [
  {
    name: "Cut & shape",
    items: [
      ["Signature cut", "A considered haircut shaped around hair texture, face structure and everyday styling.", "By consultation", "Duration confirmed at booking"],
      ["Restyle cut", "A complete change in length or shape with in-depth consultation and finish.", "By consultation", "Duration confirmed at booking"],
      ["Fringe or dry detail", "Focused reshaping and dry refinement between full appointments.", "By consultation", "Duration confirmed at booking"],
    ],
  },
  {
    name: "Colour",
    items: [
      ["Dimensional colour", "Bespoke balayage, glossing or multi-tone work designed for natural movement.", "By consultation", "Duration confirmed at booking"],
      ["Global colour", "Consistent, polished coverage or a deliberate all-over tonal change.", "By consultation", "Duration confirmed at booking"],
      ["Colour correction", "A structured consultation and restorative plan for complex colour transitions.", "By consultation", "Varies"],
    ],
  },
  {
    name: "Ritual",
    items: [
      ["Hair & scalp ritual", "Clarifying, replenishing or restorative care followed by a polished finish.", "By consultation", "Duration confirmed at booking"],
      ["Keratin smoothing", "Longer-lasting softness and manageability for suitable hair types.", "By consultation", "Duration confirmed at booking"],
      ["Grooming ritual", "Precision cut and beard architecture with considered finishing.", "By consultation", "Duration confirmed at booking"],
    ],
  },
];

const galleryItems = [
  ["Editorial cut", "Precision shape / short hair", "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1000&q=85"],
  ["Soft dimension", "Balayage / movement", "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=85"],
  ["Occasion beauty", "Bridal / evening", "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=1000&q=85"],
  ["Modern grooming", "Cut / beard", "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1000&q=85"],
  ["Colour study", "Gloss / tonal shift", "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1000&q=85"],
  ["Texture focus", "Natural / curl", "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=1000&q=85"],
];

export default async function ContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!slugs.includes(slug)) notFound();

  if (slug === "booking") {
    return (
      <main className="inner-page booking-page">
        <section className="inner-hero booking-inner-hero">
          <p className="eyebrow">Appointment</p>
          <h1>Plan your<br /><em>visit.</em></h1>
        </section>
        <section className="inner-content booking-inner">
          <div className="booking-intro">
            <p className="eyebrow">How to prepare</p>
            <h2>Tell us what<br /><em>you have in mind.</em></h2>
            <p>Choose a service, preferred artist and time. Your request is reviewed before it is confirmed.</p>
          </div>
          <Suspense fallback={<div className="booking-form" aria-label="Loading booking form" />}>
            <BookingForm />
          </Suspense>
        </section>
      </main>
    );
  }

  if (slug === "services") {
    return (
      <main className="inner-page">
        <section className="inner-hero"><p className="eyebrow">Service menu</p><h1>Precision,<br /><em>made personal.</em></h1></section>
        <section className="inner-content service-menu-page">
          {serviceGroups.map((group) => (
            <div className="menu-group" key={group.name}>
              <h2>{group.name}</h2>
              {group.items.map(([title, text, price, duration]) => (
                <article className="menu-row" key={title}>
                  <div><h3>{title}</h3><p>{text}</p></div>
                  <div className="menu-price"><strong>{price}</strong><span>{duration}</span></div>
                  <Link className="round-link" href="/booking" aria-label={`Book ${title}`}><ArrowRight /></Link>
                </article>
              ))}
            </div>
          ))}
        </section>
      </main>
    );
  }

  if (slug === "gallery") {
    return (
      <main className="inner-page">
        <section className="inner-hero"><p className="eyebrow">Lookbook</p><h1>Shape. Colour.<br /><em>Character.</em></h1></section>
        <section className="inner-content editorial-grid">
          {galleryItems.map(([title, subtitle, image]) => (
            <article key={title}><div className="editorial-image"><Image src={image} alt={`${title} editorial concept image — ${subtitle}`} fill sizes="(max-width: 700px) 50vw, 33vw" /></div><p>{subtitle}</p><h2>{title}</h2></article>
          ))}
        </section>
      </main>
    );
  }

  if (slug === "artists") {
    const artists = [
      ["Hair Artist", "Cutting & styling", "Precision cutting · Texture-led styling", "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=85"],
      ["Colour Artist", "Colour direction", "Dimensional colour · Glossing", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85"],
      ["Beauty Artist", "Beauty & grooming", "Bridal · Skin · Occasion", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85"],
    ];
    return (
      <main className="inner-page">
        <section className="inner-hero"><p className="eyebrow">Our collective</p><h1>Artists with<br /><em>a point of view.</em></h1></section>
        <section className="inner-content artist-directory">
          {artists.map(([name, role, specialty, image]) => (
            <article key={name}><div className="artist-image"><Image src={image} alt={`Editorial placeholder portrait: ${name}`} fill sizes="(max-width: 700px) 90vw, 33vw" /></div><p>{role}</p><h2>{name}</h2><span>{specialty}</span><p>Artist profiles and availability are being finalized.</p><Link href="/booking">Request this service <ArrowRight size={14} /></Link></article>
          ))}
        </section>
      </main>
    );
  }

  if (slug === "journal") {
    const posts = [
      ["A guide to dimensional colour", "Colour", "The questions to ask before you change tone, depth or placement."],
      ["Make a precision cut last", "Maintenance", "How consultation, home care and timing preserve a clean silhouette."],
      ["Curly hair, cut dry or wet?", "Texture", "Why the right approach depends on the pattern, density and movement."],
    ];
    return (
      <main className="inner-page">
        <section className="inner-hero"><p className="eyebrow">Editorial</p><h1>Notes on<br /><em>hair & beauty.</em></h1></section>
        <section className="inner-content journal-grid">
          {posts.map(([title, category, excerpt]) => (
            <article key={title}><p>{category}</p><h2>{title}</h2><span>{excerpt}</span><Link href="/booking">Discuss with an artist <ArrowRight size={14} /></Link></article>
          ))}
        </section>
      </main>
    );
  }

  const pageContent: Record<string, { eyebrow: string; title: string; copy: string; sections: [string, string][] }> = {
    about: { eyebrow: "The studio", title: "Beauty, without excess.", copy: "Lauxirio is a developing salon concept: inclusive, artist-led and attentive to the person in the chair.", sections: [["Our philosophy", "We balance technical discipline with individual interpretation, creating work that feels expressive rather than manufactured."], ["Our promise", "Every appointment begins with listening, continues with honest guidance and ends with care you can maintain."]] },
    experience: { eyebrow: "Inside Lauxirio", title: "A space for considered ritual.", copy: "The studio experience is being shaped around calm hospitality, considered design and personal attention.", sections: [["Arrival", "A composed welcome establishes time, intention and the direction of the appointment."], ["The studio", "Studio facilities and accessibility information will be added after the location is confirmed."], ["The finish", "A final review makes the result wearable, understood and genuinely yours."]] },
    contact: { eyebrow: "Contact", title: "Start a conversation.", copy: "Verified location, telephone, email and opening details have not yet been provided. They will be published here once confirmed.", sections: [["Before launch", "Add the real business address and contact information to the site configuration."], ["Appointments", "Appointment requests will be enabled once studio locations, stylists, opening slots and a database have been configured."]] },
    privacy: { eyebrow: "Legal", title: "Privacy at Lauxirio.", copy: "Appointment and enquiry information is limited to the details needed to handle the salon request.", sections: [["Information", "The booking form collects a name, contact details, appointment preference and optional notes."], ["Storage", "Requests are stored in the configured PostgreSQL database. The salon is responsible for access control, retention, deletion and backup policies."], ["Status", "A submitted request remains pending until the salon confirms availability."]] },
  };
  const content = pageContent[slug];
  if (!content) notFound();

  return (
    <main className="inner-page">
      <section className="inner-hero"><p className="eyebrow">{content.eyebrow}</p><h1>{content.title}</h1></section>
      <section className="inner-content story-content">
        <p className="lead">{content.copy}</p>
        <div className="story-content-grid">
          {content.sections.map(([title, text]) => <article key={title}><h2>{title}</h2><p>{text}</p></article>)}
        </div>
        {slug === "contact" && <div className="contact-actions"><Link className="primary-button" href="/booking">Request appointment</Link></div>}
      </section>
    </main>
  );
}
