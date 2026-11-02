"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Match About's entrance rhythm while giving each mobile row its own trigger.
export default function useSectionScrollAnimation(sectionRef) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add(
      {
        desktop: "(min-width: 1024px)",
        motion: "(prefers-reduced-motion: no-preference)",
      },
      ({ conditions }) => {
        if (!conditions.motion) return;
        const select = gsap.utils.selector(sectionRef);
        const trigger = (element, start = "top 75%") => ({
          trigger: element,
          start,
          toggleActions: "play none none reverse",
          fastScrollEnd: true,
        });
        const reveal = (timeline, target, { y = 20, x = 0, scale = 1, duration = 0.7, ease = "power2.out" } = {}, position) => {
          if (!target) return;
          timeline.fromTo(target,
            { autoAlpha: 0, x, y, scale },
            { autoAlpha: 1, x: 0, y: 0, scale: 1, duration, ease },
            position
          );
        };

        select("[data-scroll-copy]").forEach((copy) => {
          const timeline = gsap.timeline({ scrollTrigger: trigger(copy, "top 65%") });
          reveal(timeline, copy.querySelector("p"), { x: -20, y: 0, duration: 0.65 });
          reveal(timeline, copy.querySelector("h2"), { y: 25, duration: 0.8, ease: "power3.out" }, "-=0.35");
          reveal(timeline, copy.querySelector("h2 + p"), {}, "-=0.35");
          reveal(timeline, copy.querySelector("a"), { y: 15, duration: 0.6 }, "-=0.35");
        });

        select("[data-scroll-visual]").forEach((visual) => {
          const timeline = gsap.timeline({ scrollTrigger: trigger(visual) });
          reveal(timeline, visual, { y: 24, scale: conditions.desktop ? 0.98 : 1, duration: 0.85 });
        });

        select("[data-scroll-heading]").forEach((heading) => {
          const timeline = gsap.timeline({ scrollTrigger: trigger(heading) });
          reveal(timeline, heading.querySelector("p"), { y: 15, duration: 0.65 });
          reveal(timeline, heading.querySelector("h3"), { scale: 0.95, duration: 0.8 }, "-=0.4");
          reveal(timeline, heading.lastElementChild, { y: 15, duration: 0.6 }, "-=0.4");
        });

        select("[data-scroll-list]").forEach((list) => {
          const columns = getComputedStyle(list).gridTemplateColumns.split(" ").length;
          Array.from(list.children).forEach((item, index) => {
            const timeline = gsap.timeline({
              delay: (index % columns) * 0.09,
              scrollTrigger: trigger(item),
            });
            reveal(timeline, item, { y: 20, duration: 0.7 });
            const icon = item.querySelector("[data-scroll-icon]");
            if (icon) {
              timeline.fromTo(icon,
                { scale: 0.85, transformOrigin: "center" },
                { scale: 1, duration: 0.7, ease: "back.out(1.5)" },
                0
              );
            }
            reveal(timeline, item.querySelector("[data-scroll-body]"), { y: 8, duration: 0.6 }, 0.12);
          });
        });
      },
      sectionRef
    );
    return () => media.revert();
  }, [sectionRef]);
}
