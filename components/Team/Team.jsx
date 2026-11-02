"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import teamData from "./teamData";
import "./Team.css";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const interpolate = (start, end, amount) => start + (end - start) * amount;

function Team() {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const metricsRef = useRef({ cardWidth: 0, gap: 0, step: 0, count: teamData.length });
  const trackXRef = useRef(0);
  const activeIndexRef = useRef(0);
  const dragRef = useRef(null);
  const movedRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState({});
  const [loadedImages, setLoadedImages] = useState({});

  const setTrackX = useCallback((x) => {
    const track = trackRef.current;
    if (!track) return;
    trackXRef.current = x;
    gsap.set(track, { x });
  }, []);

  const goToIndex = useCallback(
    (index, duration) => {
      const track = trackRef.current;
      const step = metricsRef.current.step;
      if (!track || !step) return;

      const targetIndex = clamp(index, 0, teamData.length - 1);
      const targetX = -targetIndex * step;
      const animationDuration = reducedMotionRef.current ? 0 : duration;
      gsap.killTweensOf(track);

      if (animationDuration === 0) {
        setTrackX(targetX);
        return;
      }

      gsap.to(track, {
        x: targetX,
        duration: animationDuration,
        ease: "power3.out",
        overwrite: true,
        onUpdate: () => {
          trackXRef.current = Number(gsap.getProperty(track, "x")) || 0;
        },
        onComplete: () => {
          trackXRef.current = targetX;
        },
      });
    },
    [setTrackX]
  );

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return undefined;

    const cards = Array.from(track.querySelectorAll(".team-card"));
    if (!cards.length) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = reducedMotion.matches;
    const onMotionPreferenceChange = (event) => {
      reducedMotionRef.current = event.matches;
      if (event.matches) goToIndex(activeIndexRef.current, 0);
    };
    reducedMotion.addEventListener("change", onMotionPreferenceChange);

    const measure = () => {
      const firstCard = cards[0];
      const cardWidth = firstCard.offsetWidth;
      const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
      if (!cardWidth) return;

      metricsRef.current = {
        cardWidth,
        gap,
        step: cardWidth + gap,
        count: cards.length,
      };
      goToIndex(activeIndexRef.current, 0);
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(viewport);
    resizeObserver.observe(cards[0]);
    window.addEventListener("resize", measure);

    const updateCards = () => {
      const { cardWidth, gap, step, count } = metricsRef.current;
      if (!step) return;

      const x = trackXRef.current;
      const focusedIndex = clamp(Math.round(-x / step), 0, count - 1);
      if (focusedIndex !== activeIndexRef.current) {
        activeIndexRef.current = focusedIndex;
        setActiveIndex(focusedIndex);
      }

      const influenceDistance = cardWidth + gap;
      const mobile = window.matchMedia("(max-width: 767px)").matches;
      const inactiveScale = mobile ? 0.82 : 0.85;

      cards.forEach((card, index) => {
        const proximity = clamp(
          1 - Math.abs(x + index * step) / influenceDistance,
          0,
          1
        );
        const scale = inactiveScale + (1.07 - inactiveScale) * proximity;
        const shadowOpacity = interpolate(0.08, 0.25, proximity);
        const shadowBlur = interpolate(25, 50, proximity);
        const shadowOffset = interpolate(10, 25, proximity);
        const shadowSpread = interpolate(5, 12, proximity);
        const outlineWidth = interpolate(0, 2, proximity);
        const outlineOpacity = interpolate(0, 0.8, proximity);

        card.style.transform = `scale(${scale})`;
        card.style.zIndex =
          index === focusedIndex ? "20" : String(Math.round(1 + proximity * 19));
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

    gsap.ticker.add(updateCards);
    updateCards();

    return () => {
      gsap.ticker.remove(updateCards);
      gsap.killTweensOf(track);
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
      reducedMotion.removeEventListener("change", onMotionPreferenceChange);
    };
  }, [goToIndex]);

  const handlePointerDown = (event) => {
    if (!event.isPrimary || event.target.closest("a, button")) return;
    const track = trackRef.current;
    if (!track) return;

    gsap.killTweensOf(track);
    movedRef.current = false;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startTrackX: trackXRef.current,
      lastX: event.clientX,
      lastTime: performance.now(),
      velocity: 0,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - (drag.startY ?? event.clientY);
    if (Math.abs(deltaX) > 5) movedRef.current = true;
    if (Math.abs(deltaY) > Math.abs(deltaX) && !movedRef.current) return;
    if (!movedRef.current) return;

    event.preventDefault();
    const { step, count } = metricsRef.current;
    const minX = -step * (count - 1);
    let nextX = drag.startTrackX + deltaX;
    if (nextX > 0) nextX *= 0.25;
    if (nextX < minX) nextX = minX + (nextX - minX) * 0.25;

    const now = performance.now();
    const elapsed = now - drag.lastTime;
    if (elapsed > 0) drag.velocity = (event.clientX - drag.lastX) / elapsed;
    drag.lastX = event.clientX;
    drag.lastTime = now;
    setTrackX(nextX);
  };

  const finishDrag = (event, shouldInertialSnap = true) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    dragRef.current = null;

    if (!movedRef.current) return;
    const { step, count } = metricsRef.current;
    const releaseDelay = performance.now() - drag.lastTime;
    const releaseVelocity =
      releaseDelay > 80 ? 0 : drag.velocity * Math.exp(-releaseDelay / 100);
    const projectedX =
      trackXRef.current + clamp(releaseVelocity * 220, -step * 2, step * 2);
    const targetIndex = clamp(
      Math.round(-((shouldInertialSnap ? projectedX : trackXRef.current) / step)),
      0,
      count - 1
    );
    goToIndex(targetIndex, reducedMotionRef.current ? 0 : 0.62);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToIndex(activeIndexRef.current - 1, reducedMotionRef.current ? 0 : 0.62);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goToIndex(activeIndexRef.current + 1, reducedMotionRef.current ? 0 : 0.62);
    }
  };

  return (
    <section
      id="team"
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
          onPointerCancel={(event) => finishDrag(event, false)}
          onLostPointerCapture={(event) => finishDrag(event, false)}
          onClickCapture={(event) => {
            if (movedRef.current) {
              event.preventDefault();
              event.stopPropagation();
              movedRef.current = false;
            }
          }}
        >
          <div ref={trackRef} className="team-carousel-track">
            {teamData.map((member, index) => (
              <article
                key={member.id}
                className={`team-card${activeIndex === index ? " is-active" : ""}`}
                aria-label={`${member.name}, ${member.designation}`}
                aria-roledescription="slide"
                aria-current={activeIndex === index ? "true" : undefined}
              >
                <div className={`team-card-fallback team-card-fallback--${index % 5}`} aria-hidden="true">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <small>GDGC MCET</small>
                </div>
                {!imageErrors[member.id] && (
                  <img
                    className="team-card-image"
                    src={member.image}
                    alt={member.imageAlt}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    draggable="false"
                    style={{ visibility: loadedImages[member.id] ? "visible" : "hidden" }}
                    onLoad={() =>
                      setLoadedImages((loaded) => ({ ...loaded, [member.id]: true }))
                    }
                    onError={() =>
                      setImageErrors((errors) => ({ ...errors, [member.id]: true }))
                    }
                  />
                )}

                <div className="team-card-overlay">
                  <div className="team-card-waves" aria-hidden="true">
                    <svg className="team-wave team-wave--back" viewBox="0 0 800 180" preserveAspectRatio="none">
                      <path d="M0 72 C130 18 250 128 400 78 C550 28 670 38 800 82 V180 H0Z" />
                    </svg>
                    <svg className="team-wave team-wave--front" viewBox="0 0 800 180" preserveAspectRatio="none">
                      <path d="M0 105 C145 45 235 150 390 100 C540 50 675 65 800 100 V180 H0Z" />
                    </svg>
                  </div>
                  <div className="team-card-content">
                    {member.department && <p className="team-card-department">{member.department}</p>}
                    <h3>{member.name}</h3>
                    <p className="team-card-role">{member.designation}</p>
                    {member.memberCount && (
                      <p className="team-card-count">{member.memberCount} members</p>
                    )}
                    {member.profileLink && (
                      <a
                        className="team-card-profile"
                        href={member.profileLink}
                        aria-label={`View ${member.name}'s profile`}
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M7 17 17 7M7 7h10v10" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="team-carousel-controls">
          <button
            type="button"
            className="team-navigation-button team-navigation-button--previous"
            aria-label="Previous team member"
            disabled={activeIndex === 0}
            onClick={() => goToIndex(activeIndexRef.current - 1, 0.62)}
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
                className={`team-pagination-dot${activeIndex === index ? " is-active" : ""}`}
                aria-label={`Go to ${member.name}`}
                aria-current={activeIndex === index ? "true" : undefined}
                onClick={() => goToIndex(index, 0.62)}
              />
            ))}
          </nav>

          <button
            type="button"
            className="team-navigation-button team-navigation-button--next"
            aria-label="Next team member"
            disabled={activeIndex === teamData.length - 1}
            onClick={() => goToIndex(activeIndexRef.current + 1, 0.62)}
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
