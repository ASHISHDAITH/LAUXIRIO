"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import { galleryFilters, media } from "@/config/media";
import { serviceFilters, services } from "@/config/content";
import type { ServiceFilter } from "@/config/content";

type ExplorerVariant = "home" | "page";

export function ServiceExplorer({ variant = "home" }: { variant?: ExplorerVariant }) {
  const [filter, setFilter] = useState<ServiceFilter>("All");
  const visibleServices =
    filter === "All"
      ? services
      : services.filter((service) => service.filters.some((category) => category === filter));

  return (
    <section
      className={`services section ${variant === "page" ? "service-explorer-page" : ""}`}
      id={variant === "home" ? "services" : "service-menu"}
      aria-labelledby="service-heading"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">{variant === "home" ? "The menu" : "Service menu"}</p>
          <h2 id="service-heading">
            {variant === "home" ? (
              <>Signature <em>services</em></>
            ) : (
              <>Precision, <em>made personal.</em></>
            )}
          </h2>
        </div>
        {variant === "home" ? (
          <div className="service-heading-aside">
            <p>Created for individuality, delivered with care.</p>
            <Link href="/services" className="text-link dark-link">
              Explore the menu <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <p>Service scope, timing and pricing are confirmed with the salon before booking.</p>
        )}
      </div>
      <div className="service-tabs" role="group" aria-label="Filter services">
        {serviceFilters.map((category) => {
          const count =
            category === "All"
              ? services.length
              : services.filter((service) => service.filters.some((item) => item === category)).length;
          return (
            <button
              key={category}
              type="button"
              className={filter === category ? "active" : ""}
              aria-pressed={filter === category}
              onClick={() => setFilter(category)}
            >
              {category}
              <span>{String(count).padStart(2, "0")}</span>
            </button>
          );
        })}
      </div>
      <div className="service-list" aria-live="polite">
        {visibleServices.map((service) => (
          <article className="service-row" key={service.id}>
            <span className="service-number">{service.number}</span>
            <div className="service-image">
              <Image
                src={service.image.src}
                alt={service.image.alt}
                fill
                sizes="(max-width: 700px) 85vw, (max-width: 1100px) 28vw, 210px"
              />
            </div>
            <div className="service-detail">
              <p className="service-category">{service.category}</p>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
            <div className="service-meta">
              <span>By consultation</span>
              <small>Timing and price confirmed before booking</small>
            </div>
            <Link
              className="round-link"
              href="/booking"
              aria-label={`Request an appointment for ${service.title}`}
            >
              <ArrowRight aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>
      <p className="media-disclosure">
        Service imagery is illustrative stock or placeholder photography. People shown are not LAUXIRIO staff or clients and do not endorse the salon; no image is verified LAUXIRIO work.
      </p>
    </section>
  );
}

export function GalleryExplorer({ variant = "home" }: { variant?: ExplorerVariant }) {
  const [filter, setFilter] = useState<(typeof galleryFilters)[number]>("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerButtonRef = useRef<HTMLButtonElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const allItems = media.gallery;
  const filteredItems =
    filter === "All"
      ? allItems
      : allItems.filter((item) => item.categories.some((category) => category === filter));
  const visibleItems =
    variant === "home" ? filteredItems.slice(0, 6) : filteredItems;
  const selectedIndex = visibleItems.findIndex((item) => item.id === selectedId);
  const selectedItem = selectedIndex >= 0 ? visibleItems[selectedIndex] : null;

  useEffect(() => {
    if (!selectedItem) {
      triggerButtonRef.current?.focus();
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedId, selectedItem]);

  function closeLightbox() {
    setSelectedId(null);
  }

  function moveLightbox(direction: -1 | 1) {
    if (selectedIndex < 0 || visibleItems.length < 2) return;
    const nextIndex =
      (selectedIndex + direction + visibleItems.length) % visibleItems.length;
    setSelectedId(visibleItems[nextIndex].id);
  }

  function handleLightboxKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeLightbox();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      moveLightbox(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveLightbox(-1);
    } else if (event.key === "Tab") {
      const buttons = event.currentTarget.querySelectorAll<HTMLButtonElement>("button:not(:disabled)");
      const firstButton = buttons.item(0);
      const lastButton = buttons.item(buttons.length - 1);
      if (event.shiftKey && document.activeElement === firstButton) {
        event.preventDefault();
        lastButton?.focus();
      } else if (!event.shiftKey && document.activeElement === lastButton) {
        event.preventDefault();
        firstButton?.focus();
      }
    }
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 48) moveLightbox(delta < 0 ? 1 : -1);
    touchStartX.current = null;
  }

  return (
    <>
      <section
        className={`gallery section ${variant === "page" ? "gallery-explorer-page" : ""}`}
        id={variant === "home" ? "gallery" : "lookbook"}
        aria-labelledby="gallery-heading"
      >
        <div className="section-heading gallery-heading">
          <div>
            <p className="eyebrow">{variant === "home" ? "Editorial inspiration" : "Explore by category"}</p>
            <h2 id="gallery-heading">
              {variant === "home" ? <>The <em>lookbook</em></> : <>Shape. Colour. <em>Character.</em></>}
            </h2>
          </div>
          <div className="filters" role="group" aria-label="Filter lookbook by category">
            {galleryFilters.map((category) => (
              <button
                key={category}
                type="button"
                className={filter === category ? "active" : ""}
                aria-pressed={filter === category}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <p className="media-disclosure">
          Illustrative stock or concept images only; these are not verified client results or LAUXIRIO campaign assets. People shown are not LAUXIRIO staff or clients and do not endorse the salon.
        </p>
        <div className="gallery-grid" aria-live="polite">
          {visibleItems.map((item) => (
            <button
              className={`gallery-item ${item.orientation}`}
              key={item.id}
              type="button"
              onClick={(event) => {
                triggerButtonRef.current = event.currentTarget;
                setSelectedId(item.id);
              }}
              aria-label={`Open ${item.title}, illustrative concept image`}
            >
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                sizes={
                  variant === "page"
                    ? "(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 25vw"
                    : "(max-width: 700px) 50vw, 33vw"
                }
              />
              <span>{item.label} · Concept</span>
            </button>
          ))}
        </div>
        {variant === "home" && (
          <Link className="gallery-see-all text-link dark-link" href="/gallery">
            Explore the full lookbook <ArrowRight size={14} />
          </Link>
        )}
      </section>
      {selectedItem && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedItem.title}, image ${selectedIndex + 1} of ${visibleItems.length}`}
          onClick={(event) => {
            if (event.target === event.currentTarget) closeLightbox();
          }}
          onKeyDown={handleLightboxKeyDown}
        >
          <button
            ref={closeButtonRef}
            className="lightbox-close"
            type="button"
            onClick={closeLightbox}
            aria-label="Close lookbook image"
          >
            <X aria-hidden="true" />
          </button>
          <button
            className="lightbox-nav lightbox-previous"
            type="button"
            onClick={() => moveLightbox(-1)}
            aria-label="Previous image"
            disabled={visibleItems.length < 2}
          >
            <ArrowLeft aria-hidden="true" />
          </button>
          <div
            className="lightbox-image"
            onTouchStart={(event) => {
              touchStartX.current = event.changedTouches[0].clientX;
            }}
            onTouchEnd={handleTouchEnd}
          >
            <Image
              src={selectedItem.image.src}
              alt={selectedItem.image.alt}
              fill
              sizes="90vw"
            />
            <p className="lightbox-caption">
              {selectedItem.title} · {selectedIndex + 1} / {visibleItems.length} · Concept image
            </p>
          </div>
          <button
            className="lightbox-nav lightbox-next"
            type="button"
            onClick={() => moveLightbox(1)}
            aria-label="Next image"
            disabled={visibleItems.length < 2}
          >
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  );
}
