"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import EventCard from "./EventCard";
import eventsData from "./eventsData";
import { createEventsAnimation } from "./eventsAnimation";
import "./Events.css";

function Events() {
  const sectionRef = useRef(null);
  const [preloadImages, setPreloadImages] = useState(false);

  useEffect(() => {
    // Warm the small card images before the pinned sequence is reached, so
    // revealing a deeper stack layer doesn't initiate its download mid-swipe.
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setPreloadImages(true);
        observer.disconnect();
      }
    }, { rootMargin: "800px 0px" });
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const cards = Array.from(section.querySelectorAll(".event-card"));
    return createEventsAnimation(section, cards);
  }, []);

  return (
    <section
      id="events"
      className="events-section"
      ref={sectionRef}
      aria-labelledby="events-title"
    >
      <header className="events-heading">
        <p>GDGC MCET</p>
        <h2 id="events-title">Events</h2>
      </header>

      <div className="events-stage">
        <div className="events-deck">
          {eventsData.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} preload={preloadImages} />
          ))}
        </div>
      </div>

      <p className="events-scroll-hint" aria-hidden="true">
        Scroll to explore
      </p>
    </section>
  );
}

export default Events;
