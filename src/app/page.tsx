import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import BookingForm from "@/components/BookingForm";
import { Suspense } from "react";
import { GalleryExplorer, ServiceExplorer } from "@/components/InteractiveSections";
import Preloader from "@/components/Preloader";
import HeroCampaignMedia from "@/components/HeroCampaignMedia";
import { artistProfiles } from "@/config/content";
import { media } from "@/config/media";

export default function Home() {
  return (
    <>
      <Preloader />
      <main id="top">
        <section className="hero hero-editorial" aria-labelledby="hero-title">
          <HeroCampaignMedia
            posterSrc={media.hero.poster.src}
            videoSrc={process.env.NEXT_PUBLIC_LAUXIRIO_HERO_VIDEO_SRC}
          />
          <div className="hero-grain" aria-hidden="true" />
          <div className="hero-vignette" aria-hidden="true" />
          <div className="hero-editorial-index" aria-hidden="true">
            <span>THE ART OF PERSONAL STYLE</span>
            <span>CRAFT, CONSIDERED · MADE FOR YOU</span>
          </div>
          <div className="hero-content">
            <p className="eyebrow"><span className="hero-eyebrow-mark" /> Luxury hair, beauty & grooming <span className="hero-eyebrow-divider">/</span> Unisex</p>
            <h1 id="hero-title">Beauty,<br /><em>considered.</em></h1>
            <p className="hero-copy">A considered approach to hair, beauty and self-expression. Crafted around you, finished with intention.</p>
            <div className="hero-actions">
              <a className="primary-button" href="#booking">Reserve your experience <ArrowRight size={15} /></a>
              <a className="text-link" href="#services">Discover the menu <ArrowDown size={14} /></a>
            </div>
            <p className="hero-stock-disclosure">Illustrative Pexels stock image · not LAUXIRIO campaign work</p>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="hero-visual-frame">
              <Image
                src={media.hero.inset.src}
                alt=""
                fill
                loading="eager"
                sizes="(max-width: 700px) 72vw, (max-width: 1100px) 48vw, 38vw"
                quality={88}
              />
              <div className="hero-visual-shade" />
              <span className="hero-visual-label">STUDIO CONCEPT / PLACEHOLDER</span>
            </div>
            <span className="hero-visual-caption">UNVERIFIED PLACEHOLDER · NOT LAUXIRIO STUDIO</span>
          </div>
          <div className="hero-bottomline">
            <div className="hero-bottom-note"><span>01</span><span>Considered craft</span></div>
            <div className="hero-bottom-center">CUT · COLOUR · FORM · FINISH</div>
            <a className="scroll-cue" href="#story" aria-label="Discover the Lauxirio philosophy"><span>Scroll to explore</span><ArrowDown size={15} /></a>
          </div>
        </section>

        <section className="story section" id="story">
          <div className="story-index">01 / Philosophy</div>
          <div className="story-heading">
            <p className="eyebrow">The Lauxirio philosophy</p>
            <h2>Not a trend.<br /><em>A point of view.</em></h2>
          </div>
          <div className="story-image">
            <Image
              src={media.story.src}
              alt={media.story.alt}
              fill
              sizes="(max-width: 700px) 82vw, 45vw"
            />
            <span className="image-disclosure">Illustrative concept image</span>
          </div>
          <div className="story-copy">
            <p className="lead">We believe beauty is most powerful when it feels unmistakably yours.</p>
            <p>Lauxirio brings together exacting technique, intuitive artistry and genuine care. Every cut, color and ritual begins with listening.</p>
            <a className="text-link dark-link" href="#experts">Meet our artists <ArrowRight size={15} /></a>
          </div>
        </section>

        <ServiceExplorer />

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

        <GalleryExplorer />

        <section className="experts section" id="experts">
          <div className="section-heading"><div><p className="eyebrow">At your chair</p><h2>Meet the <em>artists</em></h2></div></div>
          <p className="media-disclosure">Profile labels and portraits are illustrative placeholders. Artist identities, biographies and availability await confirmation.</p>
          <div className="expert-grid">
            {artistProfiles.map((artist) => (
              <article className="expert-card" key={artist.id}>
                <div className="expert-image">
                  <Image src={artist.image.src} alt={artist.image.alt} fill sizes="(max-width: 700px) 90vw, 33vw" />
                  <span className="image-disclosure">Illustrative portrait</span>
                </div>
                <p>{artist.specialties}</p><h3>{artist.role}</h3>
                <span>Profile to be updated after artist details are confirmed.</span>
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

        <section className="pricing section" id="planning">
          <div className="pricing-heading"><p className="eyebrow">Before you book</p><h2>A clear path to <em>your visit.</em></h2></div>
          <div className="package-grid">
            <article><p>01 / Discuss</p><h3>Share your brief</h3><span>Start with what matters to you</span><ul><li>Your preferred look</li><li>Your everyday routine</li><li>What you want to explore</li></ul><a href="#booking">Continue to appointment <ArrowRight size={14} /></a></article>
            <article className="featured-package"><p>02 / Confirm</p><h3>Agree the details</h3><span>Before an appointment is arranged</span><ul><li>Service scope</li><li>Timing and availability</li><li>Any applicable price</li></ul><Link href="/services">Review the service menu <ArrowRight size={14} /></Link></article>
            <article><p>03 / Request</p><h3>Choose a time</h3><span>Requests remain pending until reviewed</span><ul><li>Select from configured options</li><li>Submit an appointment request</li><li>Wait for salon confirmation</li></ul><a href="#booking">Request an appointment <ArrowRight size={14} /></a></article>
          </div>
        </section>

        <section className="booking section" id="booking">
          <div className="booking-intro">
            <p className="eyebrow">Appointment</p><h2>Make time<br />for <em>yourself.</em></h2>
            <p>Share a few details and begin your Lauxirio experience. We’ll use them to prepare for your visit.</p>
            <div className="booking-details">
              <span>Times follow the configured studio timezone.</span>
              <span>Requests remain pending until confirmed by the studio.</span>
            </div>
          </div>
          <Suspense fallback={<div className="booking-form" aria-label="Loading booking form" />}>
            <BookingForm />
          </Suspense>
        </section>
      </main>

    </>
  );
}
