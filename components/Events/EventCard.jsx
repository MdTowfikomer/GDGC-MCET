"use client";

import { useState } from "react";
import Image from "next/image";

const gradientColors = ["blue", "red", "yellow", "green", "blue"];

function EventCard({ event, index }) {
  const [imageAvailable, setImageAvailable] = useState(true);

  return (
    <article
      className={`event-card event-card--${gradientColors[index]}`}
      aria-label={event.title}
      data-event-index={index}
    >
      <div className="event-card-image">
        <div className="events-image-fallback" aria-hidden="true" />
        {imageAvailable && (
          <picture>
            {event.mobileImage && (
              <source
                media="(max-width: 767px)"
                srcSet={event.mobileImage}
              />
            )}
            <Image
              src={event.image}
              alt={event.imageAlt}
              fill
              sizes="(max-width: 767px) 94vw, (max-width: 1200px) 88vw, 1120px"
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              onError={() => setImageAvailable(false)}
            />
          </picture>
        )}
        <div className="event-card-content">
          <h3>{event.title}</h3>
          <p className="event-card-description">{event.description}</p>
        </div>
      </div>
    </article>
  );
}

export default EventCard;
