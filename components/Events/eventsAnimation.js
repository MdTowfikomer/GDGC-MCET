import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function createEventsAnimation(section, cards, eventCount) {
  gsap.registerPlugin(ScrollTrigger);

  const media = gsap.matchMedia();

  media.add(
    {
      desktop: "(min-width: 1201px)",
      tablet: "(min-width: 768px) and (max-width: 1200px)",
      mobile: "(max-width: 767px)",
      reduceMotion: "(prefers-reduced-motion: reduce)",
    },
    (context) => {
      if (context.conditions.reduceMotion) return undefined;

      const { desktop, tablet } = context.conditions;
      const stackOffset = desktop ? 28 : tablet ? 20 : 14;
      const scaleStep = desktop ? 0.045 : 0.03;
      const rotationX = desktop ? 35 : tablet ? 22 : 12;

      section.classList.add("is-animated");

      gsap.set(cards, {
        zIndex: (index) => cards.length - index,
        y: (index) => index * stackOffset,
        scale: (index) => 1 - index * scaleStep,
        rotationX: 0,
        transformOrigin: "center bottom",
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: () => {
            const navbarHeight =
              document.querySelector(".navbar")?.getBoundingClientRect().height ?? 0;
            return `top top+=${navbarHeight}`;
          },
          end: () => `+=${window.innerHeight * eventCount}`,
          pin: section,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      for (let index = 0; index < cards.length; index += 1) {
        timeline.to(
          cards[index],
          {
            y: () => {
              const card = cards[index];
              const bounds = card.getBoundingClientRect();
              const currentY = Number(gsap.getProperty(card, "y")) || 0;
              const exitClearance = Math.max(24, window.innerHeight * 0.02);

              return currentY - bounds.bottom - exitClearance;
            },
            rotationX,
            duration: 1,
            ease: "none",
          },
          index
        );

        if (index < cards.length - 1) {
          timeline.to(
            cards.slice(index + 1),
            {
              y: (stackIndex) => stackIndex * stackOffset,
              scale: (stackIndex) => 1 - stackIndex * scaleStep,
              duration: 1,
              ease: "none",
            },
            index
          );
        }
      }

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
        section.classList.remove("is-animated");
        gsap.set(cards, { clearProps: "transform,zIndex" });
      };
    }
  );

  return () => media.revert();
}
