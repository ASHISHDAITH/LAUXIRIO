"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type HeroCampaignMediaProps = {
  posterSrc: string;
  videoSrc?: string;
};

type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
};

export default function HeroCampaignMedia({
  posterSrc,
  videoSrc,
}: HeroCampaignMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoActive, setVideoActive] = useState(false);

  useEffect(() => {
    if (!videoSrc || videoFailed) return;

    const video = videoRef.current;
    if (!video) return;

    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const connection = (navigator as Navigator & {
      connection?: NetworkInformation;
    }).connection;
    const shouldConserveData =
      connection?.saveData === true ||
      connection?.effectiveType === "slow-2g" ||
      connection?.effectiveType === "2g";

    const playWhenAllowed = () => {
      if (motionPreference.matches || shouldConserveData) {
        video.pause();
        return;
      }

      void video.play().catch(() => {
        setVideoFailed(true);
      });
    };

    playWhenAllowed();
    motionPreference.addEventListener("change", playWhenAllowed);

    return () => {
      motionPreference.removeEventListener("change", playWhenAllowed);
      video.pause();
    };
  }, [videoSrc, videoFailed]);

  const videoType = videoSrc?.toLowerCase().split("?")[0].endsWith(".webm")
    ? "video/webm"
    : "video/mp4";

  return (
    <div className="hero-photo" aria-hidden="true">
      <Image
        className="hero-photo-image"
        src={posterSrc}
        alt=""
        fill
        priority
        sizes="100vw"
        quality={90}
      />
      {videoSrc && !videoFailed ? (
        <video
          ref={videoRef}
          className={videoActive ? "hero-photo-video is-active" : "hero-photo-video"}
          muted
          loop
          playsInline
          preload="none"
          poster={posterSrc}
          disablePictureInPicture
          onPlaying={() => setVideoActive(true)}
          onPause={() => setVideoActive(false)}
          onError={() => setVideoFailed(true)}
        >
          <source src={videoSrc} type={videoType} />
        </video>
      ) : null}
    </div>
  );
}
