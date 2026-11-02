"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ACTIVITIES = [
  {
    title: "Workshops",
    description: "Hands-on sessions on modern technologies.",
    color: "#2979FF", // Blue
    bgCard: "bg-[#F0F7FF] dark:bg-blue-950/40",
    borderCard: "border-blue-200/90 dark:border-blue-800/50",
    shadowCard: "shadow-blue-500/15",
    dotColor: "#2979FF",
    position: "high", // Desktop crest
    icon: (
      <svg
        className="w-6 h-6 sm:w-7 sm:h-7"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <line x1="2" x2="22" y1="20" y2="20" />
      </svg>
    ),
  },
  {
    title: "Hackathons",
    description: "Collaborate, ideate and build real-world solutions.",
    color: "#FF5252", // Red
    bgCard: "bg-[#FFF1F2] dark:bg-red-950/40",
    borderCard: "border-red-200/90 dark:border-red-800/50",
    shadowCard: "shadow-red-500/15",
    dotColor: "#FF5252",
    position: "low", // Desktop trough
    icon: (
      <svg
        className="w-6 h-6 sm:w-7 sm:h-7"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: "Tech Talks",
    description: "Learn from industry experts and developers.",
    color: "#00E676", // Green
    bgCard: "bg-[#ECFDF5] dark:bg-emerald-950/40",
    borderCard: "border-emerald-200/90 dark:border-emerald-800/50",
    shadowCard: "shadow-emerald-500/15",
    dotColor: "#00E676",
    position: "high", // Desktop crest
    icon: (
      <svg
        className="w-6 h-6 sm:w-7 sm:h-7"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" x2="12" y1="19" y2="22" />
      </svg>
    ),
  },
  {
    title: "Project Building",
    description: "Turn ideas into practical projects through teamwork.",
    color: "#FFB300", // Yellow / Gold
    bgCard: "bg-[#FFFBEB] dark:bg-amber-950/40",
    borderCard: "border-amber-200/90 dark:border-amber-800/50",
    shadowCard: "shadow-amber-500/15",
    dotColor: "#FFB300",
    position: "low", // Desktop trough
    icon: (
      <svg
        className="w-6 h-6 sm:w-7 sm:h-7"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    title: "Networking",
    description: "Connect with mentors, alumni and fellow developers.",
    color: "#A855F7", // Purple
    bgCard: "bg-[#FAF5FF] dark:bg-purple-950/40",
    borderCard: "border-purple-200/90 dark:border-purple-800/50",
    shadowCard: "shadow-purple-500/15",
    dotColor: "#A855F7",
    position: "high", // Desktop crest
    icon: (
      <svg
        className="w-6 h-6 sm:w-7 sm:h-7"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Tech Exploration",
    description: "Discover AI, Web, Cloud, Android and Open Source.",
    color: "#0284C7", // Cyan / Ocean Blue
    bgCard: "bg-[#F0F9FF] dark:bg-sky-950/40",
    borderCard: "border-sky-200/90 dark:border-sky-800/50",
    shadowCard: "shadow-sky-500/15",
    dotColor: "#0284C7",
    position: "low", // Desktop trough
    icon: (
      <svg
        className="w-6 h-6 sm:w-7 sm:h-7"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      </svg>
    ),
  },
];

export default function AboutSection() {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const headingScriptRef = useRef(null);
  const headingBoldRef = useRef(null);
  const doodleHeadingRaysRef = useRef(null);
  const descRef = useRef(null);
  const doodlesRef = useRef(null);
  const studentImageContainerRef = useRef(null);
  const whatWeDoTagRef = useRef(null);
  const cursiveTitleRef = useRef(null);
  const whatWeDoDescRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // ── 1. UPPER BLOCK: RESPONSIVE ANIMATIONS ──
      const mm = gsap.matchMedia();

      // ── PHONE / MOBILE (< 1024px) ──
      // On phone, text and student photo are stacked vertically.
      // Text animates first when section is entered, and the doodle lines over the
      // student image trigger specifically when the user scrolls down to 40-50% on the image.
      mm.add("(max-width: 1023px)", () => {
        // Text intro
        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        })
          .fromTo(badgeRef.current, { autoAlpha: 0, x: -20 }, { autoAlpha: 1, x: 0, duration: 0.6, ease: "power2.out" })
          .fromTo(headingScriptRef.current, { autoAlpha: 0, y: 20, rotate: -2 }, { autoAlpha: 1, y: 0, rotate: 0, duration: 0.7, ease: "power2.out" }, "-=0.3")
          .fromTo(headingBoldRef.current, { autoAlpha: 0, y: 25 }, { autoAlpha: 1, y: 0, duration: 0.75, ease: "power3.out" }, "-=0.4")
          .fromTo(doodleHeadingRaysRef.current, { autoAlpha: 0, scale: 0.4 }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(2)" }, "-=0.4")
          .fromTo(descRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.65, ease: "power2.out" }, "-=0.3");

        // Doodle Lines & Rays over the Student Image (Starts when image top reaches 45% of viewport)
        gsap.timeline({
          scrollTrigger: {
            trigger: studentImageContainerRef.current,
            start: "top 48%",
            toggleActions: "play none none reverse",
          },
        })
          .fromTo(
            ".student-doodle-path",
            { strokeDashoffset: 600, autoAlpha: 0 },
            {
              strokeDashoffset: 0,
              autoAlpha: 1,
              duration: 1.2,
              stagger: 0.2,
              ease: "power2.out",
            }
          )
          .fromTo(
            ".student-doodle-ray",
            { scale: 0, transformOrigin: "center bottom", autoAlpha: 0 },
            { scale: 1, autoAlpha: 1, duration: 0.55, stagger: 0.08, ease: "back.out(2)" },
            "-=0.6"
          );
      });

      // ── DESKTOP (>= 1024px) ──
      // On large screens, text and student photo are side-by-side and animate together
      mm.add("(min-width: 1024px)", () => {
        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        })
          .fromTo(badgeRef.current, { autoAlpha: 0, x: -20 }, { autoAlpha: 1, x: 0, duration: 0.7, ease: "power2.out" })
          .fromTo(headingScriptRef.current, { autoAlpha: 0, y: 20, rotate: -2 }, { autoAlpha: 1, y: 0, rotate: 0, duration: 0.75, ease: "power2.out" }, "-=0.4")
          .fromTo(headingBoldRef.current, { autoAlpha: 0, y: 25 }, { autoAlpha: 1, y: 0, duration: 0.85, ease: "power3.out" }, "-=0.45")
          .fromTo(doodleHeadingRaysRef.current, { autoAlpha: 0, scale: 0.4 }, { autoAlpha: 1, scale: 1, duration: 0.6, ease: "back.out(2)" }, "-=0.5")
          .fromTo(descRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.75, ease: "power2.out" }, "-=0.4")
          .fromTo(
            ".student-doodle-path",
            { strokeDashoffset: 600, autoAlpha: 0 },
            { strokeDashoffset: 0, autoAlpha: 1, duration: 1.2, stagger: 0.2, ease: "power2.out" },
            "-=0.5"
          )
          .fromTo(
            ".student-doodle-ray",
            { scale: 0, transformOrigin: "center bottom", autoAlpha: 0 },
            { scale: 1, autoAlpha: 1, duration: 0.55, stagger: 0.08, ease: "back.out(2)" },
            "-=0.6"
          );
      });

      // ── 2. LOWER BLOCK: Triggers specifically when user scrolls down to 'What We Do' ──
      const whatWeDoTl = gsap.timeline({
        scrollTrigger: {
          trigger: whatWeDoTagRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      whatWeDoTl
        .fromTo(
          whatWeDoTagRef.current,
          { autoAlpha: 0, y: 15 },
          { autoAlpha: 1, y: 0, duration: 0.65, ease: "power2.out" }
        )
        .fromTo(
          cursiveTitleRef.current,
          { autoAlpha: 0, y: 20, scale: 0.95 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(
          ".cursive-ray",
          { scale: 0, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 0.5, stagger: 0.06, ease: "back.out(2)" },
          "-=0.5"
        )
        .fromTo(
          whatWeDoDescRef.current,
          { autoAlpha: 0, y: 15 },
          { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.4"
        )
        // Staggered entrance for the squircle buttons & cards
        .fromTo(
          ".timeline-node",
          { autoAlpha: 0, y: 30, scale: 0.9 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.09,
            ease: "back.out(1.5)",
          },
          "-=0.3"
        )
        .fromTo(
          ".timeline-card-content",
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.09,
            ease: "power2.out",
          },
          "-=0.6"
        )
        .fromTo(
          ".timeline-ribbon-path",
          { strokeDashoffset: 1400 },
          { strokeDashoffset: 0, duration: 1.5, ease: "power1.inOut" },
          "-=0.9"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full pt-12 sm:pt-16 pb-20 sm:pb-28 overflow-hidden bg-bg text-fg transition-colors duration-300"
    >
      {/* ─── COLORFUL ORGANIC CORNER BLOBS (Vibrant Perimeter) ─── */}
      <div
        className="absolute -top-12 -left-16 w-56 sm:w-80 h-56 sm:h-80 bg-[#2979FF]/20 dark:bg-[#2979FF]/15 rounded-full blur-3xl pointer-events-none animate-pulse"
        style={{ animationDuration: "7s" }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 -left-20 w-48 sm:w-72 h-48 sm:h-72 bg-[#FF5252]/18 dark:bg-[#FF5252]/12 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -top-10 -right-16 w-60 sm:w-84 h-60 sm:h-84 bg-[#00E676]/20 dark:bg-[#00E676]/15 rounded-full blur-3xl pointer-events-none animate-pulse"
        style={{ animationDuration: "8s" }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 -right-20 w-52 sm:w-76 h-52 sm:h-76 bg-[#FFD600]/18 dark:bg-[#FFD600]/12 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ─── UPPER PART: INTRO TEXT + STUDENT PHOTO WITH HAND-DRAWN DOODLES ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-5 text-center lg:text-left">
            {/* Badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 mb-2 sm:mb-3"
            >
              <span className="text-accent font-bold text-xs sm:text-sm tracking-widest uppercase">
                About GDGC
              </span>
              <span className="w-10 h-[2px] bg-accent/70 rounded-full" />
            </div>

            {/* Title with two-style typography + Doodle rays */}
            <div className="relative">
              <h2 className="leading-[1.15]">
                {/* Line 1: Handwritten Cursive 'What is' */}
                <span
                  ref={headingScriptRef}
                  className="block font-caveat text-4xl sm:text-5xl lg:text-6xl text-fg font-bold tracking-wide"
                >
                  What is
                </span>

                {/* Line 2: Bold 'GDGC on Campus?' */}
                <span
                  ref={headingBoldRef}
                  className="block text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-fg"
                >
                  <span className="text-accent italic font-semibold">
                    GDGC on
                  </span>{" "}
                  Campus?
                </span>
              </h2>

              {/* Doodle Burst Rays next to the Title */}
              <div
                ref={doodleHeadingRaysRef}
                className="hidden sm:inline-flex absolute -top-4 right-8 lg:-right-4 items-center gap-1.5 pointer-events-none"
                aria-hidden="true"
              >
                <svg width="42" height="34" viewBox="0 0 42 34" fill="none">
                  <line x1="4" y1="24" x2="16" y2="6" stroke="#EA4335" strokeWidth="3.5" strokeLinecap="round" />
                  <line x1="18" y1="28" x2="28" y2="12" stroke="#FFD600" strokeWidth="3.5" strokeLinecap="round" />
                  <line x1="26" y1="32" x2="38" y2="20" stroke="#00E676" strokeWidth="3.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Paragraph Description */}
            <p
              ref={descRef}
              className="mt-4 sm:mt-5 text-sm sm:text-base text-fg-muted leading-relaxed max-w-lg mx-auto lg:mx-0"
            >
              Google Developer Groups on Campus (GDGC) is a student-led
              developer community powered by Google Developers,{" "}
              <strong className="font-semibold text-fg">
                that brings students together to explore technology, share
                knowledge and build innovative solutions.
              </strong>
            </p>
          </div>

          {/* Right Column: Student Photo + Doodle Outlines & Rays */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            <div ref={studentImageContainerRef} className="relative w-full max-w-xl lg:max-w-none aspect-[16/10] sm:aspect-[16/10] lg:aspect-[16/9] rounded-2xl md:rounded-3xl overflow-hidden shadow-sm bg-accent/5">
              <Image
                src="/about-students-img.png"
                alt="GDGC MCET Campus Community"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 700px"
                className="object-cover object-center"
              />

              {/* ── SVG Doodle Outlines & Celebratory Rays Overlay ── */}
              <svg
                ref={doodlesRef}
                viewBox="0 0 1000 562"
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
                fill="none"
              >
                {/* 1. Left Student */}
                <g id="left-student-doodles" transform="translate(0, -90)">
                  <path
                    className="student-doodle-path"
                    d="M 120 440 C 90 320, 110 180, 210 150 C 310 120, 360 210, 370 320"
                    stroke="#EA4335"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="600"
                    strokeDashoffset="0"
                  />
                  <g className="student-doodle-ray">
                    <line x1="200" y1="120" x2="185" y2="80" stroke="#FFD600" strokeWidth="5" strokeLinecap="round" />
                    <line x1="230" y1="110" x2="230" y2="65" stroke="#FFD600" strokeWidth="5" strokeLinecap="round" />
                    <line x1="260" y1="120" x2="275" y2="80" stroke="#FFD600" strokeWidth="5" strokeLinecap="round" />
                  </g>
                </g>

                {/* 2. Center Female Student */}
                <g id="center-student-doodles" transform="translate(0, -30)">
                  <path
                    className="student-doodle-path"
                    d="M 390 420 C 370 280, 410 200, 485 190 C 570 180, 580 290, 565 420"
                    stroke="#FFD600"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="600"
                    strokeDashoffset="0"
                  />
                </g>

                {/* 3. Right Student */}
                <g id="right-student-doodles" transform="translate(0, -35)">
                  <path
                    className="student-doodle-path"
                    d="M 670 410 C 670 240, 710 130, 785 120 C 860 110, 895 240, 885 410"
                    stroke="#00E676"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="600"
                    strokeDashoffset="0"
                  />
                  <g className="student-doodle-ray">
                    <line x1="755" y1="90" x2="740" y2="50" stroke="#00E676" strokeWidth="5" strokeLinecap="round" />
                    <line x1="785" y1="80" x2="785" y2="35" stroke="#00E676" strokeWidth="5" strokeLinecap="round" />
                    <line x1="815" y1="90" x2="830" y2="50" stroke="#00E676" strokeWidth="5" strokeLinecap="round" />
                  </g>
                </g>
              </svg>

              {/* Editorial feathering blend */}
              <div
                className="hidden lg:block absolute inset-0 pointer-events-none bg-gradient-to-r from-bg via-transparent to-transparent opacity-90"
                aria-hidden="true"
              />
              <div
                className="hidden lg:block absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-bg to-transparent opacity-80 pointer-events-none"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* ─── CONNECTING SEAM (Zero Extraneous Margin) ─── */}
        <div className="mt-6 sm:mt-8 md:mt-10 text-center max-w-4xl mx-auto">
          {/* Centered '— WHAT WE DO —' */}
          <div
            ref={whatWeDoTagRef}
            className="inline-flex items-center justify-center gap-2 sm:gap-3"
          >
            <span className="w-10 sm:w-16 h-[2px] bg-accent/70 rounded-full" />
            <span className="text-accent font-bold tracking-widest text-xs sm:text-sm uppercase">
              What We Do
            </span>
            <span className="w-10 sm:w-16 h-[2px] bg-accent/70 rounded-full" />
          </div>

          {/* Handwritten Tagline with Flanking Colorful Doodle Rays */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mt-2 sm:mt-3">
            {/* Left Flanking Doodle Rays */}
            <svg
              className="w-7 h-7 sm:w-10 sm:h-10 flex-shrink-0 cursive-ray"
              viewBox="0 0 40 40"
              fill="none"
              aria-hidden="true"
            >
              <line x1="28" y1="30" x2="8" y2="36" stroke="#00E676" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="30" y1="22" x2="10" y2="18" stroke="#FFD600" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="32" y1="14" x2="16" y2="4" stroke="#EA4335" strokeWidth="3.5" strokeLinecap="round" />
            </svg>

            {/* Handwritten Title */}
            <h3
              ref={cursiveTitleRef}
              className="font-caveat text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] text-fg font-bold tracking-wide leading-tight"
            >
              Learn by Exploring. Grow by Doing.
            </h3>

            {/* Right Flanking Doodle Rays */}
            <svg
              className="w-7 h-7 sm:w-10 sm:h-10 flex-shrink-0 cursive-ray"
              viewBox="0 0 40 40"
              fill="none"
              aria-hidden="true"
            >
              <line x1="12" y1="30" x2="32" y2="36" stroke="#2979FF" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="10" y1="22" x2="30" y2="18" stroke="#FFD600" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="8" y1="14" x2="24" y2="4" stroke="#EA4335" strokeWidth="3.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* Subtitle */}
          <p
            ref={whatWeDoDescRef}
            className="mt-2 text-xs sm:text-sm md:text-base text-fg-muted max-w-2xl mx-auto leading-relaxed"
          >
            We create opportunities for students to learn, experiment, collaborate
            and apply technology through a range of activities.
          </p>
        </div>

        {/* ─── 6-ACTIVITY CONNECTED CONSTELLATION TIMELINE ─── */}
        <div ref={timelineRef} className="mt-8 sm:mt-14 max-w-6xl mx-auto">
          {/* ══════════════════════════════════════════════════════════════
              DESKTOP VIEW: Horizontal Alternating Timeline
              (Matching mobile visual design, expanded horizontally)
             ══════════════════════════════════════════════════════════════ */}
          <div className="hidden lg:block relative py-6">
            {/* The Horizontal Undulating Sine Ribbon & Milestone Track SVG */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <svg
                className="w-full h-full"
                viewBox="0 0 1200 320"
                preserveAspectRatio="none"
                fill="none"
              >
                {/* Outer soft glowing ambient ribbon */}
                <path
                  d="M 40 160 C 80 140, 90 140, 100 160 C 160 200, 240 200, 300 160 C 360 120, 440 120, 500 160 C 560 200, 640 200, 700 160 C 760 120, 840 120, 900 160 C 960 200, 1040 200, 1100 160 C 1120 145, 1140 145, 1160 160"
                  stroke="rgba(216, 180, 254, 0.4)"
                  strokeWidth="20"
                  strokeLinecap="round"
                />

                {/* Inner smooth animated track */}
                <path
                  className="timeline-ribbon-path"
                  d="M 40 160 C 80 140, 90 140, 100 160 C 160 200, 240 200, 300 160 C 360 120, 440 120, 500 160 C 560 200, 640 200, 700 160 C 760 120, 840 120, 900 160 C 960 200, 1040 200, 1100 160 C 1120 145, 1140 145, 1160 160"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="1400"
                  strokeDashoffset="0"
                />

                {/* Subtle Dashed Center Guide */}
                <path
                  d="M 40 160 C 80 140, 90 140, 100 160 C 160 200, 240 200, 300 160 C 360 120, 440 120, 500 160 C 560 200, 640 200, 700 160 C 760 120, 840 120, 900 160 C 960 200, 1040 200, 1100 160 C 1120 145, 1140 145, 1160 160"
                  stroke="#94A3B8"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  strokeOpacity="0.45"
                />

                {/* Milestone Dots with white border halo at (100, 300, 500, 700, 900, 1100) */}
                <circle cx="100" cy="160" r="7.5" fill="white" className="dark:fill-zinc-900" />
                <circle cx="100" cy="160" r="5" fill="#2979FF" />

                <circle cx="300" cy="160" r="7.5" fill="white" className="dark:fill-zinc-900" />
                <circle cx="300" cy="160" r="5" fill="#FF5252" />

                <circle cx="500" cy="160" r="7.5" fill="white" className="dark:fill-zinc-900" />
                <circle cx="500" cy="160" r="5" fill="#00E676" />

                <circle cx="700" cy="160" r="7.5" fill="white" className="dark:fill-zinc-900" />
                <circle cx="700" cy="160" r="5" fill="#FFB300" />

                <circle cx="900" cy="160" r="7.5" fill="white" className="dark:fill-zinc-900" />
                <circle cx="900" cy="160" r="5" fill="#A855F7" />

                <circle cx="1100" cy="160" r="7.5" fill="white" className="dark:fill-zinc-900" />
                <circle cx="1100" cy="160" r="5" fill="#0284C7" />

                {/* Vertical Dotted Connector Stems */}
                {/* Col 0 (x=100): Icon top (115 -> 152), Dot to Card (168 -> 205) */}
                <line x1="100" y1="115" x2="100" y2="152" stroke="#2979FF" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="100" y1="168" x2="100" y2="205" stroke="#2979FF" strokeWidth="2" strokeDasharray="3 3" />

                {/* Col 1 (x=300): Card top (115 -> 152), Dot to Icon (168 -> 205) */}
                <line x1="300" y1="115" x2="300" y2="152" stroke="#FF5252" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="300" y1="168" x2="300" y2="205" stroke="#FF5252" strokeWidth="2" strokeDasharray="3 3" />

                {/* Col 2 (x=500): Icon top (115 -> 152), Dot to Card (168 -> 205) */}
                <line x1="500" y1="115" x2="500" y2="152" stroke="#00E676" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="500" y1="168" x2="500" y2="205" stroke="#00E676" strokeWidth="2" strokeDasharray="3 3" />

                {/* Col 3 (x=700): Card top (115 -> 152), Dot to Icon (168 -> 205) */}
                <line x1="700" y1="115" x2="700" y2="152" stroke="#FFB300" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="700" y1="168" x2="700" y2="205" stroke="#FFB300" strokeWidth="2" strokeDasharray="3 3" />

                {/* Col 4 (x=900): Icon top (115 -> 152), Dot to Card (168 -> 205) */}
                <line x1="900" y1="115" x2="900" y2="152" stroke="#A855F7" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="900" y1="168" x2="900" y2="205" stroke="#A855F7" strokeWidth="2" strokeDasharray="3 3" />

                {/* Col 5 (x=1100): Card top (115 -> 152), Dot to Icon (168 -> 205) */}
                <line x1="1100" y1="115" x2="1100" y2="152" stroke="#0284C7" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="1100" y1="168" x2="1100" y2="205" stroke="#0284C7" strokeWidth="2" strokeDasharray="3 3" />
              </svg>
            </div>

            {/* 6 Alternating Columns Grid */}
            <div className="grid grid-cols-6 gap-2 xl:gap-3.5 relative z-10">
              {ACTIVITIES.map((activity, idx) => {
                const isEven = idx % 2 === 0;

                return (
                  <div
                    key={activity.title}
                    className="flex flex-col items-center justify-between px-1 h-[320px]"
                  >
                    {isEven ? (
                      /* ── EVEN (0, 2, 4): Icon on TOP, Card on BOTTOM ── */
                      <>
                        {/* Top Lane: Squircle Claymorphic Icon Button */}
                        <div className="h-[110px] flex items-center justify-center relative w-full">
                          {idx === 0 && (
                            /* 3 Little Cyan Rays for Workshops */
                            <div className="absolute -top-3 left-4 xl:left-6 pointer-events-none">
                              <svg width="24" height="24" viewBox="0 0 26 26" fill="none">
                                <line x1="4" y1="18" x2="1" y2="15" stroke="#2979FF" strokeWidth="2.5" strokeLinecap="round" />
                                <line x1="7" y1="12" x2="2" y2="7" stroke="#2979FF" strokeWidth="2.5" strokeLinecap="round" />
                                <line x1="14" y1="8" x2="13" y2="2" stroke="#2979FF" strokeWidth="2.5" strokeLinecap="round" />
                              </svg>
                            </div>
                          )}
                          <div
                            className={`timeline-node w-15 h-15 xl:w-16 xl:h-16 rounded-2xl ${activity.bgCard} ${activity.borderCard} border shadow-md ${activity.shadowCard} flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 cursor-pointer`}
                            style={{ color: activity.color }}
                          >
                            {activity.icon}
                          </div>
                        </div>

                        {/* Middle Spacer for Ribbon & Milestone Dot */}
                        <div className="h-[40px] pointer-events-none" />

                        {/* Bottom Lane: Clean Rounded Card */}
                        <div className="h-[140px] w-full flex items-center justify-center">
                          <div
                            className={`timeline-card-content w-full p-3 xl:p-3.5 rounded-2xl bg-bg-alt/95 dark:bg-zinc-900/85 border ${activity.borderCard} shadow-sm hover:shadow-md transition-all duration-300 text-center flex flex-col justify-center min-h-[92px]`}
                          >
                            <h4 className="text-xs xl:text-sm font-bold text-fg tracking-tight mb-1">
                              {activity.title}
                            </h4>
                            <p className="text-[11px] xl:text-xs text-fg-muted leading-relaxed">
                              {activity.description}
                            </p>
                          </div>
                        </div>
                      </>
                    ) : (
                      /* ── ODD (1, 3, 5): Card on TOP, Icon on BOTTOM ── */
                      <>
                        {/* Top Lane: Clean Rounded Card */}
                        <div className="h-[110px] w-full flex items-center justify-center">
                          <div
                            className={`timeline-card-content w-full p-3 xl:p-3.5 rounded-2xl bg-bg-alt/95 dark:bg-zinc-900/85 border ${activity.borderCard} shadow-sm hover:shadow-md transition-all duration-300 text-center flex flex-col justify-center min-h-[92px]`}
                          >
                            <h4 className="text-xs xl:text-sm font-bold text-fg tracking-tight mb-1">
                              {activity.title}
                            </h4>
                            <p className="text-[11px] xl:text-xs text-fg-muted leading-relaxed">
                              {activity.description}
                            </p>
                          </div>
                        </div>

                        {/* Middle Spacer for Ribbon & Milestone Dot */}
                        <div className="h-[40px] pointer-events-none" />

                        {/* Bottom Lane: Squircle Claymorphic Icon Button */}
                        <div className="h-[140px] flex items-center justify-center w-full">
                          <div
                            className={`timeline-node w-15 h-15 xl:w-16 xl:h-16 rounded-2xl ${activity.bgCard} ${activity.borderCard} border shadow-md ${activity.shadowCard} flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 cursor-pointer`}
                            style={{ color: activity.color }}
                          >
                            {activity.icon}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════
              MOBILE VIEW: Alternating S-Curve Winding Timeline
              (Exactly matching uploaded_media_1_1793612770582.jpg)
             ══════════════════════════════════════════════════════════════ */}
          <div className="lg:hidden relative py-4 px-2 max-w-md mx-auto">
            {/* Continuous Dotted S-Curve Winding Path SVG */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <svg
                className="w-full h-full"
                viewBox="0 0 360 760"
                preserveAspectRatio="none"
                fill="none"
              >
                {/* Center Wavy Dotted Path */}
                <path
                  className="timeline-ribbon-path"
                  d="M 180 30 Q 130 90, 180 150 T 180 270 T 180 390 T 180 510 T 180 630 T 180 730"
                  stroke="#94A3B8"
                  strokeWidth="2.5"
                  strokeDasharray="5 6"
                  strokeOpacity="0.6"
                />

                {/* Milestone Dots at each step center (180, Y) */}
                <circle cx="180" cy="45" r="5" fill="#2979FF" />
                <circle cx="180" cy="165" r="5" fill="#FF5252" />
                <circle cx="180" cy="285" r="5" fill="#00E676" />
                <circle cx="180" cy="405" r="5" fill="#FFB300" />
                <circle cx="180" cy="525" r="5" fill="#A855F7" />
                <circle cx="180" cy="645" r="5" fill="#0284C7" />

                {/* Horizontal Connector Stems */}
                <line x1="88" y1="45" x2="175" y2="45" stroke="#2979FF" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="185" y1="165" x2="272" y2="165" stroke="#FF5252" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="88" y1="285" x2="175" y2="285" stroke="#00E676" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="185" y1="405" x2="272" y2="405" stroke="#FFB300" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="88" y1="525" x2="175" y2="525" stroke="#A855F7" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="185" y1="645" x2="272" y2="645" stroke="#0284C7" strokeWidth="2" strokeDasharray="3 3" />
              </svg>
            </div>

            {/* 6 Alternating Steps */}
            <div className="space-y-8 relative z-10">
              {ACTIVITIES.map((activity, idx) => {
                const isEven = idx % 2 === 0;

                return (
                  <div
                    key={activity.title}
                    className="grid grid-cols-2 gap-8 items-center min-h-[90px]"
                  >
                    {isEven ? (
                      /* ── EVEN STEP: Icon on LEFT, Content Card on RIGHT ── */
                      <>
                        {/* Left: Squircle Icon Card */}
                        <div className="flex justify-center pr-2">
                          <div
                            className={`timeline-node w-16 h-16 rounded-2xl ${activity.bgCard} ${activity.borderCard} border shadow-md ${activity.shadowCard} flex items-center justify-center`}
                            style={{ color: activity.color }}
                          >
                            {activity.icon}
                          </div>
                        </div>

                        {/* Right: Content Card */}
                        <div className="pl-2">
                          <div
                            className={`timeline-card-content p-3.5 rounded-2xl bg-bg-alt/90 dark:bg-zinc-900/80 border ${activity.borderCard} shadow-sm`}
                          >
                            <h4 className="text-sm font-bold text-fg tracking-tight mb-0.5">
                              {activity.title}
                            </h4>
                            <p className="text-[11px] text-fg-muted leading-relaxed">
                              {activity.description}
                            </p>
                          </div>
                        </div>
                      </>
                    ) : (
                      /* ── ODD STEP: Content Card on LEFT, Icon on RIGHT ── */
                      <>
                        {/* Left: Content Card */}
                        <div className="pr-2">
                          <div
                            className={`timeline-card-content p-3.5 rounded-2xl bg-bg-alt/90 dark:bg-zinc-900/80 border ${activity.borderCard} shadow-sm text-left`}
                          >
                            <h4 className="text-sm font-bold text-fg tracking-tight mb-0.5">
                              {activity.title}
                            </h4>
                            <p className="text-[11px] text-fg-muted leading-relaxed">
                              {activity.description}
                            </p>
                          </div>
                        </div>

                        {/* Right: Squircle Icon Card */}
                        <div className="flex justify-center pl-2">
                          <div
                            className={`timeline-node w-16 h-16 rounded-2xl ${activity.bgCard} ${activity.borderCard} border shadow-md ${activity.shadowCard} flex items-center justify-center`}
                            style={{ color: activity.color }}
                          >
                            {activity.icon}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
