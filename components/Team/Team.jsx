"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import teamData from "./teamData";
import "./Team.css";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const interpolate = (start, end, amount) => start + (end - start) * amount;

// 3 sets for gapless infinite mobile scroll: Set 1 (left clones), Set 2 (main), Set 3 (right clones)
const ALL_CARDS = [
  ...teamData.map((m) => ({ ...m, uniqueKey: `${m.id}-clone-left`, isClone: true })),
  ...teamData.map((m) => ({ ...m, uniqueKey: m.id, isClone: false })),
  ...teamData.map((m) => ({ ...m, uniqueKey: `${m.id}-clone-right`, isClone: true })),
];

function Team() {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const trackXRef = useRef(0);
  const activeIndexRef = useRef(0);
  const isDraggingRef = useRef(false);
  const isPausedRef = useRef(false);
  const dragDataRef = useRef(null);
  const reducedMotionRef = useRef(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState({});
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = reducedMotion.matches;
    const onMotionChange = (e) => {
      reducedMotionRef.current = e.matches;
    };
    reducedMotion.addEventListener("change", onMotionChange);

    const mm = gsap.matchMedia();

    // -------------------------------------------------------------
    // DESKTOP: Vertical-to-Horizontal Pinned ScrollTrigger (>= 1024px)
    // -------------------------------------------------------------
    mm.add("(min-width: 1024px)", () => {
      const desktopCards = Array.from(
        track.querySelectorAll(".team-card:not(.team-card--clone)")
      );
      if (!desktopCards.length) return undefined;

      // Reset transforms
      gsap.set(track, { clearProps: "x" });
      desktopCards.forEach((c) => gsap.set(c, { clearProps: "all" }));

      let step = 0;
      let totalTravel = 0;

      const measureDesktop = () => {
        const cardWidth = desktopCards[0].offsetWidth;
        const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 24;
        step = cardWidth + gap;
        totalTravel = (desktopCards.length - 1) * step;
      };

      measureDesktop();

      const updateDesktopCards = () => {
        if (!step) return;
        const x = Number(gsap.getProperty(track, "x")) || 0;
        const influenceDistance = step;

        desktopCards.forEach((card, index) => {
          const proximity = clamp(
            1 - Math.abs(x + index * step) / influenceDistance,
            0,
            1
          );
          const scale = 0.85 + (1.07 - 0.85) * proximity;
          const shadowOpacity = interpolate(0.08, 0.25, proximity);
          const shadowBlur = interpolate(25, 50, proximity);
          const shadowOffset = interpolate(10, 25, proximity);
          const shadowSpread = interpolate(5, 12, proximity);
          const outlineWidth = interpolate(0, 2, proximity);
          const outlineOpacity = interpolate(0, 0.8, proximity);

          card.style.transform = `scale(${scale})`;
          card.style.zIndex =
            index === activeIndexRef.current
              ? "20"
              : String(Math.round(1 + proximity * 19));
          card.style.filter = `brightness(${interpolate(
            0.92,
            1,
            proximity
          )}) contrast(${interpolate(0.98, 1, proximity)})`;
          card.style.boxShadow =
            `0 ${shadowOffset}px ${shadowBlur}px -${shadowSpread}px ` +
            `rgba(0, 0, 0, ${shadowOpacity}), 0 0 0 ${outlineWidth}px ` +
            `rgba(255, 255, 255, ${outlineOpacity})`;
        });
      };

      const horizontalScrollTrigger = ScrollTrigger.create({
        id: "team-desktop-pin",
        trigger: section,
        pin: true,
        start: "top top",
        end: () => `+=${Math.round(totalTravel * 1.05)}`,
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        animation: gsap.to(track, {
          x: () => -totalTravel,
          ease: "none",
        }),
        onUpdate: (self) => {
          const targetIndex = clamp(
            Math.round(self.progress * (desktopCards.length - 1)),
            0,
            desktopCards.length - 1
          );
          if (targetIndex !== activeIndexRef.current) {
            activeIndexRef.current = targetIndex;
            setActiveIndex(targetIndex);
          }
        },
      });

      gsap.ticker.add(updateDesktopCards);
      updateDesktopCards();

      return () => {
        gsap.ticker.remove(updateDesktopCards);
        if (horizontalScrollTrigger) horizontalScrollTrigger.kill();
        desktopCards.forEach((c) => gsap.set(c, { clearProps: "all" }));
        gsap.set(track, { clearProps: "x" });
      };
    });

    // -------------------------------------------------------------
    // MOBILE: Continuous Infinite Horizontal Scroll (< 1024px)
    // -------------------------------------------------------------
    mm.add("(max-width: 1023px)", () => {
      const allCards = Array.from(track.querySelectorAll(".team-card"));
      if (!allCards.length) return undefined;

      let cardWidth = 0;
      let gap = 0;
      let step = 0;
      let cycleWidth = 0;
      let centerOffset = 0;

      const measureMobile = () => {
        cardWidth = allCards[0].offsetWidth;
        gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 16;
        step = cardWidth + gap;
        cycleWidth = step * teamData.length;
        centerOffset = (window.innerWidth - cardWidth) / 2;
        trackXRef.current = -cycleWidth + centerOffset;
        gsap.set(track, { x: trackXRef.current });
      };

      measureMobile();

      let lastTime = performance.now();
      const autoSpeed = 38; // pixels per second

      const updateMobileCards = () => {
        const viewportCenter = window.innerWidth / 2;
        const influence = cardWidth * 0.75;
        let closestIndex = 0;
        let minDistance = Infinity;

        allCards.forEach((card, index) => {
          const rect = card.getBoundingClientRect();
          // Skip cards far offscreen
          if (rect.right < -100 || rect.left > window.innerWidth + 100) return;

          const cardCenter = rect.left + rect.width / 2;
          const dist = Math.abs(cardCenter - viewportCenter);

          if (dist < minDistance) {
            minDistance = dist;
            closestIndex = index % teamData.length;
          }

          const proximity = clamp(1 - dist / influence, 0, 1);
          const scale = 0.9 + 0.12 * proximity;
          card.style.transform = `scale(${scale})`;
          if (proximity > 0.5) {
            card.classList.add("is-active");
          } else {
            card.classList.remove("is-active");
          }
        });

        if (closestIndex !== activeIndexRef.current) {
          activeIndexRef.current = closestIndex;
          setActiveIndex(closestIndex);
        }
      };

      const mobileTicker = () => {
        const now = performance.now();
        const dt = Math.min((now - lastTime) / 1000, 0.1);
        lastTime = now;

        if (!isDraggingRef.current && !isPausedRef.current && !reducedMotionRef.current) {
          trackXRef.current -= autoSpeed * dt;

          const minX = -2 * cycleWidth + centerOffset;
          const maxX = centerOffset;

          if (trackXRef.current <= minX) {
            trackXRef.current += cycleWidth;
          } else if (trackXRef.current >= maxX) {
            trackXRef.current -= cycleWidth;
          }

          gsap.set(track, { x: trackXRef.current });
        }

        updateMobileCards();
      };

      gsap.ticker.add(mobileTicker);

      return () => {
        gsap.ticker.remove(mobileTicker);
        allCards.forEach((c) => {
          c.classList.remove("is-active");
          gsap.set(c, { clearProps: "all" });
        });
        gsap.set(track, { clearProps: "x" });
      };
    });

    return () => {
      mm.revert();
      reducedMotion.removeEventListener("change", onMotionChange);
    };
  }, []);

  // -------------------------------------------------------------
  // Controls & Keyboard Navigation
  // -------------------------------------------------------------
  const scrollToCard = useCallback((targetIndex) => {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (isDesktop) {
      const st = ScrollTrigger.getById("team-desktop-pin");
      if (!st) return;
      const clampedIndex = clamp(targetIndex, 0, teamData.length - 1);
      const progress = clampedIndex / (teamData.length - 1);
      const targetScroll = st.start + progress * (st.end - st.start);
      window.scrollTo({
        top: targetScroll,
        behavior: reducedMotionRef.current ? "auto" : "smooth",
      });
    }
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollToCard(activeIndexRef.current - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollToCard(activeIndexRef.current + 1);
    }
  };

  // -------------------------------------------------------------
  // Mobile Touch & Pointer Interaction
  // -------------------------------------------------------------
  const handlePointerDown = (event) => {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (isDesktop) return;
    if (!event.isPrimary || event.target.closest("a, button")) return;

    const track = trackRef.current;
    if (!track) return;

    gsap.killTweensOf(track);
    isDraggingRef.current = true;
    isPausedRef.current = true;

    dragDataRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      lastTime: performance.now(),
      velocity: 0,
      hasMoved: false,
    };

    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // Ignore pointer capture errors if unsupported
    }
  };

  const handlePointerMove = (event) => {
    const drag = dragDataRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;

    // Detect intent: if vertical swipe is dominant before horizontal drag, let page scroll!
    if (!drag.hasMoved) {
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 8) {
        dragDataRef.current = null;
        isDraggingRef.current = false;
        isPausedRef.current = false;
        return;
      }
      if (Math.abs(deltaX) > 6) {
        drag.hasMoved = true;
      }
    }

    if (!drag.hasMoved) return;

    event.preventDefault();
    const moveDelta = event.clientX - drag.lastX;
    const now = performance.now();
    const elapsed = now - drag.lastTime;
    if (elapsed > 0) {
      drag.velocity = moveDelta / elapsed;
    }
    drag.lastX = event.clientX;
    drag.lastTime = now;

    trackXRef.current += moveDelta;

    const track = trackRef.current;
    if (track) {
      const card = track.querySelector(".team-card");
      if (card) {
        const cardWidth = card.offsetWidth;
        const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 16;
        const cycleWidth = (cardWidth + gap) * teamData.length;
        const centerOffset = (window.innerWidth - cardWidth) / 2;
        const minX = -2 * cycleWidth + centerOffset;
        const maxX = centerOffset;

        if (trackXRef.current <= minX) {
          trackXRef.current += cycleWidth;
        } else if (trackXRef.current >= maxX) {
          trackXRef.current -= cycleWidth;
        }
      }
      gsap.set(track, { x: trackXRef.current });
    }
  };

  const finishDrag = (event) => {
    const drag = dragDataRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    try {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    } catch {
      // Ignore
    }

    const hadMoved = drag.hasMoved;
    const velocity = drag.velocity;
    dragDataRef.current = null;
    isDraggingRef.current = false;

    const track = trackRef.current;
    if (hadMoved && track && Math.abs(velocity) > 0.15) {
      const card = track.querySelector(".team-card");
      const cardWidth = card ? card.offsetWidth : 300;
      const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 16;
      const cycleWidth = (cardWidth + gap) * teamData.length;
      const centerOffset = (window.innerWidth - cardWidth) / 2;
      const minX = -2 * cycleWidth + centerOffset;
      const maxX = centerOffset;

      const inertiaDistance = clamp(velocity * 240, -cardWidth * 2, cardWidth * 2);
      const targetX = trackXRef.current + inertiaDistance;

      gsap.to(trackXRef, {
        current: targetX,
        duration: 0.6,
        ease: "power2.out",
        onUpdate: () => {
          if (trackXRef.current <= minX) {
            trackXRef.current += cycleWidth;
          } else if (trackXRef.current >= maxX) {
            trackXRef.current -= cycleWidth;
          }
          gsap.set(track, { x: trackXRef.current });
        },
        onComplete: () => {
          isPausedRef.current = false;
        },
      });
    } else {
      // Resume auto scroll after a short pause
      setTimeout(() => {
        isPausedRef.current = false;
      }, 500);
    }
  };

  return (
    <section
      id="team"
      ref={sectionRef}
      className="team-section"
      aria-labelledby="team-title"
    >
      <header className="team-heading">
        <p>GDGC MCET</p>
        <h2 id="team-title">Meet the Team</h2>
      </header>

      <div className="team-carousel">
        <div
          ref={viewportRef}
          className="team-carousel-viewport"
          role="region"
          aria-label="GDGC MCET team members"
          aria-roledescription="carousel"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
          onClickCapture={(event) => {
            if (dragDataRef.current?.hasMoved) {
              event.preventDefault();
              event.stopPropagation();
            }
          }}
        >
          <div ref={trackRef} className="team-carousel-track">
            {ALL_CARDS.map((member, index) => {
              const baseId = member.id;
              const isFirstSet = !member.isClone;
              return (
                <article
                  key={member.uniqueKey}
                  className={`team-card${member.isClone ? " team-card--clone" : ""}${
                    activeIndex === index % teamData.length ? " is-active" : ""
                  }`}
                  aria-label={
                    member.category === "core"
                      ? member.title
                      : `${member.category === "tech" ? "Tech" : "Non-Tech"}: ${member.title}`
                  }
                  aria-roledescription="slide"
                  aria-current={
                    isFirstSet && activeIndex === index % teamData.length
                      ? "true"
                      : undefined
                  }
                >
                  <div
                    className={`team-card-fallback team-card-fallback--${
                      (index % teamData.length) % 5
                    }`}
                    aria-hidden="true"
                  >
                    <span>
                      {String((index % teamData.length) + 1).padStart(2, "0")}
                    </span>
                    <small>GDGC MCET</small>
                  </div>

                  {!imageErrors[baseId] && (
                    <Image
                      className="team-card-image"
                      src={member.image}
                      alt={member.imageAlt}
                      fill
                      sizes="(max-width: 480px) 78vw, (max-width: 767px) 76vw, 320px"
                      loading="lazy"
                      decoding="async"
                      draggable="false"
                      style={{
                        visibility: loadedImages[baseId] ? "visible" : "hidden",
                      }}
                      onLoad={() =>
                        setLoadedImages((loaded) => ({ ...loaded, [baseId]: true }))
                      }
                      onError={() =>
                        setImageErrors((errors) => ({ ...errors, [baseId]: true }))
                      }
                    />
                  )}

                  <div className="team-card-overlay">
                    <div className="team-card-waves" aria-hidden="true">
                      <svg
                        className="team-wave team-wave--back"
                        viewBox="0 0 800 180"
                        preserveAspectRatio="none"
                      >
                        <path d="M0 72 C130 18 250 128 400 78 C550 28 670 38 800 82 V180 H0Z" />
                      </svg>
                      <svg
                        className="team-wave team-wave--front"
                        viewBox="0 0 800 180"
                        preserveAspectRatio="none"
                      >
                        <path d="M0 105 C145 45 235 150 390 100 C540 50 675 65 800 100 V180 H0Z" />
                      </svg>
                    </div>

                    <div className="team-card-content">
                      {member.category !== "core" && (
                        <p className="team-card-department">
                          {member.category === "tech" ? "Tech" : "Non-Tech"}
                        </p>
                      )}
                      <h3>{member.title}</h3>
                      {member.memberCount && (
                        <p className="team-card-count">{member.memberCount} members</p>
                      )}
                      {member.profileLink && (
                        <a
                          className="team-card-profile"
                          href={member.profileLink}
                          aria-label={`View ${member.title}'s profile`}
                        >
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M7 17 17 7M7 7h10v10" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="team-carousel-controls">
          <button
            type="button"
            className="team-navigation-button team-navigation-button--previous"
            aria-label="Previous team member"
            disabled={activeIndex === 0}
            onClick={() => scrollToCard(activeIndexRef.current - 1)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <nav className="team-pagination" aria-label="Team member slides">
            {teamData.map((member, index) => (
              <button
                key={member.id}
                type="button"
                className={`team-pagination-dot${
                  activeIndex === index ? " is-active" : ""
                }`}
                aria-label={`Go to ${member.title}`}
                aria-current={activeIndex === index ? "true" : undefined}
                onClick={() => scrollToCard(index)}
              />
            ))}
          </nav>

          <button
            type="button"
            className="team-navigation-button team-navigation-button--next"
            aria-label="Next team member"
            disabled={activeIndex === teamData.length - 1}
            onClick={() => scrollToCard(activeIndexRef.current + 1)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Team;
