import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import InnerHero from "@/components/InnerHero";
import { getJournalReadingTime, journalArticles } from "@/config/content";

export const instant = false;

export function generateStaticParams() {
  return journalArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = journalArticles.find((item) => item.slug === slug);
  if (!article) return {};
  return {
    title: `${article.title} | Lauxirio Journal`,
    description: article.excerpt,
    robots: { index: false, follow: false },
  };
}

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = journalArticles.find((item) => item.slug === slug);
  if (!article) notFound();

  const relatedArticles = journalArticles.filter((item) => item.slug !== article.slug);

  return (
    <main className="inner-page journal-article-page">
      <InnerHero eyebrow={`${article.category} · Editorial preview`} image={article.image}>
        {article.title}
      </InnerHero>
      <article className="article-content">
        <div className="article-meta">
          <span>Publication date pending owner approval</span>
          <span>{getJournalReadingTime(article)} min read</span>
        </div>
        <p className="media-disclosure">
          This original editorial draft is awaiting review. It is general salon content, not expert or medical advice.
        </p>
        <figure className="article-image">
          <Image src={article.image.src} alt={article.image.alt} fill sizes="(max-width: 700px) 90vw, 72vw" />
          <figcaption>Illustrative stock image · Not verified LAUXIRIO work</figcaption>
        </figure>
        <p className="article-lead">{article.excerpt}</p>
        <div className="article-body">
          {article.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </section>
          ))}
        </div>
        <Link className="article-back-link" href="/journal">
          <ArrowLeft size={14} /> Back to journal
        </Link>
      </article>
      <section className="related-stories">
        <div className="section-heading">
          <div><p className="eyebrow">Continue reading</p><h2>Related <em>notes</em></h2></div>
        </div>
        <div className="journal-grid">
          {relatedArticles.map((related) => (
            <article key={related.slug}>
              <Link className="journal-card-image" href={`/journal/${related.slug}`} aria-label={`Read preview: ${related.title}`}>
                <Image src={related.image.src} alt={related.image.alt} fill sizes="(max-width: 700px) 90vw, 33vw" />
                <span className="image-disclosure">Illustrative stock · not LAUXIRIO work</span>
              </Link>
              <p>{related.category} · Preview</p>
              <h2>{related.title}</h2>
              <span>{related.excerpt}</span>
              <Link href={`/journal/${related.slug}`}>Read preview <ArrowRight size={14} /></Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
