import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import BookingForm from "@/components/BookingForm";
import { GalleryExplorer as GallerySection, ServiceExplorer } from "@/components/InteractiveSections";
import InnerHero from "@/components/InnerHero";
import { artistProfiles, getJournalReadingTime, journalArticles } from "@/config/content";
import { media } from "@/config/media";

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
      description: `${labels[slug]} at Lauxirio. Verified business details and approved campaign assets will be added when supplied.`,
    };
  });
}

const pageContent: Record<string, {
  eyebrow: string;
  title: string;
  copy: string;
  sections: [string, string][];
}> = {
  about: {
    eyebrow: "The studio",
    title: "Beauty, without excess.",
    copy: "Lauxirio is a developing salon concept: inclusive, artist-led and attentive to the person in the chair.",
    sections: [
      ["Our philosophy", "We balance technical discipline with individual interpretation, creating work that feels expressive rather than manufactured."],
      ["Our promise", "Every appointment begins with listening, continues with honest guidance and ends with care you can maintain."],
    ],
  },
  experience: {
    eyebrow: "Inside Lauxirio",
    title: "A space for considered ritual.",
    copy: "The studio experience is being shaped around calm hospitality, considered design and personal attention.",
    sections: [
      ["Arrival", "A composed welcome establishes time, intention and the direction of the appointment."],
      ["The studio", "Studio facilities and accessibility information will be added after the location is confirmed."],
      ["The finish", "A final review makes the result wearable, understood and genuinely yours."],
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Start a conversation.",
    copy: "Verified location, telephone, email and opening details have not yet been provided. They will be published here once confirmed.",
    sections: [
      ["Before launch", "Add the real business address and contact information to the site configuration."],
      ["Appointments", "Appointment requests depend on confirmed salon locations, artists, opening slots and database configuration."],
    ],
  },
  privacy: {
    eyebrow: "Legal",
    title: "Privacy at Lauxirio.",
    copy: "Appointment and enquiry information is limited to the details needed to handle the salon request.",
    sections: [
      ["Information", "The booking form collects a name, contact details, appointment preference and optional notes."],
      ["Storage", "Requests are stored in the configured PostgreSQL database. The salon is responsible for access control, retention, deletion and backup policies."],
      ["Status", "A submitted request remains pending until the salon confirms availability."],
    ],
  },
};

function JournalPreviewMeta({ slug }: { slug: string }) {
  const article = journalArticles.find((item) => item.slug === slug);
  if (!article) return null;
  return (
    <p className="journal-preview-meta">
      Editorial preview · Publication date pending · {getJournalReadingTime(article)} min read
    </p>
  );
}

export default async function ContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!slugs.includes(slug)) notFound();

  if (slug === "booking") {
    return (
      <main className="inner-page booking-page">
        <InnerHero eyebrow="Appointment" image={media.hero.poster} className="booking-inner-hero">
          Plan your<br /><em>visit.</em>
        </InnerHero>
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
        <InnerHero eyebrow="Service menu" image={media.studio.interior}>
          Precision,<br /><em>made personal.</em>
        </InnerHero>
        <ServiceExplorer variant="page" />
      </main>
    );
  }

  if (slug === "gallery") {
    return (
      <main className="inner-page">
        <InnerHero eyebrow="Lookbook · Concept imagery" image={media.gallery[0].image}>
          Shape. Colour.<br /><em>Character.</em>
        </InnerHero>
        <GallerySection variant="page" />
      </main>
    );
  }

  if (slug === "artists") {
    return (
      <main className="inner-page">
        <InnerHero eyebrow="Our collective · Profiles in progress" image={media.artists[0].image}>
          Artists with<br /><em>a point of view.</em>
        </InnerHero>
        <section className="inner-content artist-page">
          <p className="content-lead">
            Artist identities, biographies, qualifications and availability will be published after they are confirmed.
          </p>
          <p className="media-disclosure">
            Current role labels and portraits are illustrative placeholders, not representations of confirmed Lauxirio staff.
          </p>
          <div className="artist-directory">
            {artistProfiles.map((artist) => (
              <article key={artist.id}>
                <div className="artist-image">
                  <Image src={artist.image.src} alt={artist.image.alt} fill sizes="(max-width: 700px) 90vw, 33vw" />
                  <span className="image-disclosure">Illustrative portrait</span>
                </div>
                <p>Profile in progress</p>
                <h2>{artist.role}</h2>
                <span>{artist.specialties}</span>
                <p>Profile details are pending confirmation.</p>
                <Link href="/booking">Request an appointment <ArrowRight size={14} /></Link>
              </article>
            ))}
          </div>
        </section>
      </main>
    );
  }

  if (slug === "journal") {
    const [featuredArticle, ...articles] = journalArticles;
    return (
      <main className="inner-page">
        <InnerHero eyebrow="Editorial · Draft previews" image={media.studio.detail}>
          Notes on<br /><em>hair & beauty.</em>
        </InnerHero>
        <section className="inner-content journal-index">
          <p className="media-disclosure">
            These original editorial previews are awaiting owner review. No publication dates or expert credentials have been supplied.
          </p>
          <article className="journal-featured">
            <Link className="journal-featured-image" href={`/journal/${featuredArticle.slug}`} aria-label={`Read preview: ${featuredArticle.title}`}>
              <Image src={featuredArticle.image.src} alt={featuredArticle.image.alt} fill sizes="(max-width: 800px) 90vw, 55vw" />
              <span className="image-disclosure">Illustrative stock · not LAUXIRIO work</span>
            </Link>
            <div className="journal-featured-copy">
              <p>{featuredArticle.category} · Featured preview</p>
              <h2>{featuredArticle.title}</h2>
              <span>{featuredArticle.excerpt}</span>
              <JournalPreviewMeta slug={featuredArticle.slug} />
              <Link href={`/journal/${featuredArticle.slug}`}>Read preview <ArrowRight size={14} /></Link>
            </div>
          </article>
          <div className="journal-grid">
            {articles.map((article) => (
              <article key={article.slug}>
                <Link className="journal-card-image" href={`/journal/${article.slug}`} aria-label={`Read preview: ${article.title}`}>
                  <Image src={article.image.src} alt={article.image.alt} fill sizes="(max-width: 700px) 90vw, 33vw" />
                  <span className="image-disclosure">Illustrative stock · not LAUXIRIO work</span>
                </Link>
                <p>{article.category} · Preview</p>
                <h2>{article.title}</h2>
                <span>{article.excerpt}</span>
                <JournalPreviewMeta slug={article.slug} />
                <Link href={`/journal/${article.slug}`}>Read preview <ArrowRight size={14} /></Link>
              </article>
            ))}
          </div>
        </section>
      </main>
    );
  }

  const content = pageContent[slug];
  if (!content) notFound();
  const heroImage =
    slug === "about"
      ? media.story
      : slug === "experience"
        ? media.studio.interior
        : media.studio.detail;

  return (
    <main className="inner-page">
      <InnerHero eyebrow={content.eyebrow} image={heroImage}>
        {content.title}
      </InnerHero>
      <section className="inner-content story-content">
        <p className="lead">{content.copy}</p>
        <div className="story-content-grid">
          {content.sections.map(([title, text]) => (
            <article key={title}><h2>{title}</h2><p>{text}</p></article>
          ))}
        </div>
        {(slug === "about" || slug === "experience") && (
          <div className="studio-editorial">
            <div className="studio-editorial-copy">
              <p className="eyebrow">Studio concept</p>
              <h2>{slug === "about" ? <>A considered point <em>of view.</em></> : <>A space taking <em>shape.</em></>}</h2>
              <p>
                These images are visual references only. The actual studio, facilities, location and accessibility details are not yet confirmed.
              </p>
            </div>
            <div className="studio-editorial-image">
              <Image src={media.studio.detail.src} alt={media.studio.detail.alt} fill sizes="(max-width: 700px) 90vw, 45vw" />
              <span className="image-disclosure">Illustrative concept image</span>
            </div>
          </div>
        )}
        {slug === "contact" && (
          <div className="contact-actions">
            <Link className="primary-button" href="/booking">Request appointment</Link>
          </div>
        )}
      </section>
    </main>
  );
}
