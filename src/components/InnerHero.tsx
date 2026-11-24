import Image from "next/image";
import type { ReactNode } from "react";
import type { MediaImage } from "@/config/media";

type InnerHeroProps = {
  eyebrow: string;
  image: MediaImage;
  children: ReactNode;
  className?: string;
};

export default function InnerHero({
  eyebrow,
  image,
  children,
  className = "",
}: InnerHeroProps) {
  return (
    <section className={`inner-hero ${className}`}>
      <Image
        className="inner-hero-image"
        src={image.src}
        alt=""
        fill
        sizes="100vw"
        quality={75}
        preload
      />
      <div className="inner-hero-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{children}</h1>
      </div>
      <p className="inner-hero-disclosure">Illustrative concept imagery · Not verified salon photography</p>
    </section>
  );
}
