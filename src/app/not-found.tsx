import Link from "next/link";

export default function NotFound() {
  return (
    <main className="inner-page">
      <section className="inner-hero">
        <p className="eyebrow">404 / Page unavailable</p>
        <h1>Nothing here,<br /><em>yet.</em></h1>
        <Link className="primary-button" href="/" style={{ marginTop: 32, width: "fit-content" }}>Return home</Link>
      </section>
    </main>
  );
}
