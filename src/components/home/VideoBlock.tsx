"use client";

import { useRef, useState } from "react";
import Reveal from "@/components/Reveal";

export default function VideoBlock() {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);

  const toggleMute = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };
  const togglePlay = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  };

  return (
    <section className="section pt-0">
      <div className="wrap">
        <Reveal className="max-w-2xl mb-10">
          <p className="eyebrow mb-4">See it live</p>
          <h2 className="display text-[clamp(1.9rem,5vw,3.4rem)]">
            This is your brand, <span className="text-amber">on the road.</span>
          </h2>
        </Reveal>

        <Reveal>
          <div className="relative frame rounded-[26px] p-2 md:p-3 bg-white shadow-[var(--shadow-lg)]">
            {/* blurred glow behind */}
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[40px] blur-[70px] bg-[radial-gradient(60%_60%_at_50%_50%,rgba(247,134,26,0.18),rgba(11,167,160,0.10),transparent)]" />

            <div className="relative overflow-hidden rounded-[18px] bg-black">
              <video
                ref={ref}
                src="/showreel.mp4"
                className="w-full h-auto block"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />

              {/* controls */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={togglePlay}
                  aria-label={playing ? "Pause" : "Play"}
                  className="grid place-items-center w-10 h-10 rounded-full bg-white/85 backdrop-blur text-[var(--ink)] shadow-[var(--shadow-md)] hover:bg-white transition-colors"
                >
                  {playing ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                  )}
                </button>
                <button
                  onClick={toggleMute}
                  aria-label={muted ? "Unmute" : "Mute"}
                  className="grid place-items-center w-10 h-10 rounded-full bg-white/85 backdrop-blur text-[var(--ink)] shadow-[var(--shadow-md)] hover:bg-white transition-colors"
                >
                  {muted ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5z" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5z" /><path d="M15.5 8.5a5 5 0 0 1 0 7" /><path d="M18.5 5.5a9 9 0 0 1 0 13" /></svg>
                  )}
                </button>
              </div>

              <span className="absolute top-4 left-4 chip !bg-white/85 backdrop-blur">
                <span className="dot" /> Live on the streets
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
