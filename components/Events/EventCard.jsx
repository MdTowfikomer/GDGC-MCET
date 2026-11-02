"use client";

import { useState } from "react";

function EventCard({ event, index }) {
  const [imageAvailable, setImageAvailable] = useState(event.imageAvailable);

  return (
    <article
      className="event-card"
      aria-label={`${event.title}, ${event.category}`}
      data-event-index={index}
    >
      <div className={`event-card-image ${event.fallbackStyle}`}>
        <div className="events-image-fallback" aria-hidden="true">
          <span className="events-image-fallback-number">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="events-image-fallback-label">Event image</span>
        </div>
        {imageAvailable && (
          <img
            src={event.image}
            alt={event.imageAlt}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            onError={() => setImageAvailable(false)}
          />
        )}
      </div>
      <div className="event-card-content">
        <p className="event-card-category">{event.category}</p>
        <h3>{event.title}</h3>
        <p className="event-card-description">{event.description}</p>
      </div>
    </article>
  );
}

export default EventCard;
