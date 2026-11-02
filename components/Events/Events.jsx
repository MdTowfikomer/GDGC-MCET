"use client";

import { useEffect, useRef } from "react";
import EventCard from "./EventCard";
import eventsData from "./eventsData";
import { createEventsAnimation } from "./eventsAnimation";
import "./Events.css";

function Events() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const cards = Array.from(section.querySelectorAll(".event-card"));
    return createEventsAnimation(section, cards, eventsData.length);
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
            <EventCard key={event.id} event={event} index={index} />
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
