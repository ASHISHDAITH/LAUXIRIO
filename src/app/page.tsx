import Image from "next/image";
import { ArrowDown, ArrowRight } from "lucide-react";
import BookingForm from "@/components/BookingForm";
import { Suspense } from "react";
import { GalleryExplorer, ServiceExplorer } from "@/components/InteractiveSections";
import Preloader from "@/components/Preloader";
import HeroCampaignMedia from "@/components/HeroCampaignMedia";

const experts = [
  ["https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=85", "Hair Artist", "Cutting & Styling", "Editorial cutting · Texture-led styling"],
  ["https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=85", "Colour Artist", "Colour Direction", "Dimensional colour · Glossing"],
  ["https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=85", "Beauty Artist", "Beauty & Grooming", "Bridal · Skin · Occasion"],
];

export default function Home() {
  return (
    <>
      <Preloader />
      <main id="top">
        <section className="hero hero-editorial" aria-labelledby="hero-title">
          <HeroCampaignMedia
            posterSrc="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=2400&q=90"
            videoSrc={process.env.NEXT_PUBLIC_LAUXIRIO_HERO_VIDEO_SRC}
          />
          <div className="hero-grain" aria-hidden="true" />
          <div className="hero-vignette" aria-hidden="true" />
          <div className="hero-editorial-index" aria-hidden="true">
            <span>THE ART OF PERSONAL STYLE</span>
            <span>EST. IN CRAFT · MADE FOR YOU</span>
          </div>
          <div className="hero-content">
            <p className="eyebrow"><span className="hero-eyebrow-mark" /> Luxury hair, beauty & grooming <span className="hero-eyebrow-divider">/</span> Unisex</p>
            <h1 id="hero-title">Beauty,<br /><em>considered.</em></h1>
            <p className="hero-copy">A considered approach to hair, beauty and self-expression. Crafted around you, finished with intention.</p>
            <div className="hero-actions">
              <a className="primary-button" href="#booking">Reserve your experience <ArrowRight size={15} /></a>
              <a className="text-link" href="#services">Discover the menu <ArrowDown size={14} /></a>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="hero-visual-frame">
              <Image
                src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1100&q=88"
                alt=""
                fill
                sizes="(max-width: 700px) 72vw, (max-width: 1100px) 48vw, 38vw"
                quality={88}
              />
              <div className="hero-visual-shade" />
              <span className="hero-visual-label">THE STUDIO / 001</span>
            </div>
            <span className="hero-visual-caption">A PLACE FOR YOUR NEXT CHAPTER</span>
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
            <Image src="https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=1200&q=85" alt="Salon interior concept image" fill sizes="(max-width: 700px) 82vw, 45vw" />
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
          <div className="expert-grid">
            {experts.map((expert) => (
              <article className="expert-card" key={expert[1]}>
                <div className="expert-image"><Image src={expert[0]} alt={`Editorial placeholder portrait: ${expert[1]}`} fill sizes="(max-width: 700px) 90vw, 33vw" /></div>
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
            <article><p>01 / Signature</p><h3>The New Cut</h3><span>By consultation</span><ul><li>Consultation</li><li>Precision cut</li><li>Wash & finish</li></ul><a href="#booking">Enquire <ArrowRight size={14} /></a></article>
            <article className="featured-package"><p>02 / Complete</p><h3>The Lauxirio Ritual</h3><span>By consultation</span><ul><li>Hair consultation</li><li>Cut or colour</li><li>Beauty finishing</li></ul><a href="#booking">Enquire <ArrowRight size={14} /></a></article>
            <article><p>03 / Occasion</p><h3>The Bridal Edit</h3><span>By consultation</span><ul><li>Bridal preview</li><li>Hair & makeup</li><li>Touch-up kit</li></ul><a href="#booking">Enquire <ArrowRight size={14} /></a></article>
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
