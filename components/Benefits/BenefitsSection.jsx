"use client";

import Image from "next/image";
import { useRef } from "react";
import useSectionScrollAnimation from "../animation/useSectionScrollAnimation";
import styles from "./BenefitsSection.module.css";

const BENEFITS = [
  "Hands-on experience",
  "Technical skills",
  "Collaboration",
  "Industry exposure",
  "Leadership opportunities",
  "Personal growth",
];

const PILLARS = [
  {
    name: "Learn",
    subtitle: "Follow your curiosity",
    description: "Explore new technologies, join workshops, and learn alongside people who love to share.",
    color: "#1a73e8",
    icon: <><path d="m3 9 9-5 9 5-9 5-9-5Z" /><path d="M6 11v6c4 3 8 3 12 0v-6M21 9v7" /></>,
  },
  {
    name: "Build",
    subtitle: "Make something that matters",
    description: "Take an idea beyond your notebook. Experiment, build projects, and solve real problems together.",
    color: "#d93025",
    icon: <><path d="M14 5c3-2 6-2 6-2s0 3-2 6l-6 6-4-4 6-6Z" /><path d="m8 11-4 1 3-6 7-1M12 15l-1 4 6-3 1-7M7 15c-3 0-3 5-3 5s5 0 5-3" /><circle cx="15" cy="8" r="1" /></>,
  },
  {
    name: "Connect",
    subtitle: "Find your people",
    description: "Meet fellow developers, mentors, and alumni. Build friendships that grow beyond the classroom.",
    color: "#188038",
    icon: <><circle cx="9" cy="7" r="3" /><path d="M3 21v-3a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v3M16 4a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 4v3" /></>,
  },
  {
    name: "Empower",
    subtitle: "Grow into your next role",
    description: "Share what you know, take the lead, and help others find the confidence to start their own journey.",
    color: "#b77900",
    icon: <path d="m13 2-9 12h7l-1 8 10-13h-8l1-7Z" />,
  },
];

export default function BenefitsSection() {
  const sectionRef = useRef(null);

  useSectionScrollAnimation(sectionRef);

  return (
    <section id="benefits" ref={sectionRef} className={styles.section} aria-labelledby="benefits-title">
      <div className={styles.container}>
        <div className={styles.intro}>
          <div className={styles.copy} data-scroll-copy>
            <p className={styles.eyebrow}>The perks of belonging</p>
            <h2 id="benefits-title" className={styles.title}>
              More than knowledge.
              <span className={styles.handwritten}>Real experiences.</span>
            </h2>
            <p className={styles.description}>
              Put what you learn into practice. Find your people, build your skills,
              and discover what you’re capable of at GDGC MCET.
            </p>
            <a href="#events" className={styles.link}>
              Find your next experience
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <path d="M4 12h15m-6-6 6 6-6 6" />
              </svg>
            </a>
          </div>

          <figure className={styles.visual} data-scroll-visual>
            <div className={styles.visualHeading}>
              <span className={styles.visualLabel}>Better, together.</span>
              <span className={styles.dots} aria-hidden="true"><i /><i /><i /><i /></span>
            </div>
            <Image
              src="/benefits-event.webp"
              alt="Students and a mentor reviewing a laptop project together at a GDGC MCET event"
              width={1280}
              height={720}
              sizes="(max-width: 767px) 100vw, (max-width: 1200px) 55vw, 650px"
              className={styles.image}
            />
            <figcaption className={styles.visualCaption}>A little curiosity. A lot of possibility.</figcaption>
          </figure>

          <ul className={styles.benefits} aria-label="Member benefits" data-scroll-list>
            {BENEFITS.map((benefit) => (
              <li key={benefit}>
                <svg data-scroll-icon viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <circle cx="10" cy="10" r="8" />
                  <path d="m6.5 10 2.3 2.3 4.7-4.6" />
                </svg>
                <span data-scroll-body>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.pillars}>
          <div className={styles.pillarsHeading} data-scroll-heading>
            <div>
              <p className={styles.eyebrow}>Our four pillars</p>
              <h3 className={styles.pillarsTitle}>Four ways to grow.<br /><span>One community behind you.</span></h3>
            </div>
            <p className={styles.pillarsDescription}>However you start, you don’t have to figure it all out alone.</p>
          </div>
          <ul className={styles.pillarList} data-scroll-list>
            {PILLARS.map((pillar, index) => (
              <li key={pillar.name} className={styles.pillar} style={{ "--pillar-color": pillar.color }}>
                <div className={styles.pillarTop}>
                  <svg data-scroll-icon className={styles.pillarIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{pillar.icon}</svg>
                  <span className={styles.number} aria-hidden="true">0{index + 1}</span>
                </div>
                <div className={styles.pillarBody} data-scroll-body>
                  <h4>{pillar.name}</h4>
                  <p className={styles.subtitle}>{pillar.subtitle}</p>
                  <p className={styles.pillarDescription}>{pillar.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
