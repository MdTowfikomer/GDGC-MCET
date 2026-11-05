import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { eventMotionSettings } from "./eventMotionSettings";

export function createEventsAnimation(section, cards) {
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
      if (context.conditions.reduceMotion || cards.length < 2) return undefined;

      const { desktop, tablet, mobile } = context.conditions;
      const settings = () => eventMotionSettings(
        { desktop, tablet }, section.clientHeight, cards.length
      );
      const { stackOffset, scaleStep, rotationX, scrub, initialHold, visibleCards } = settings();
      const navbarHeight = () => document.querySelector(".navbar")?.offsetHeight ?? 0;
      const exitY = (card) => {
        // Layout offsets stay stable while GSAP transforms and pins the deck.
        let top = 0;
        for (let node = card; node && node !== section; node = node.offsetParent) {
          top += node.offsetTop;
        }
        return -(navbarHeight() + top + card.offsetHeight + 24);
      };

      section.classList.add("is-animated");

      gsap.set(cards, {
        zIndex: (index) => cards.length - index,
        y: (index) => index * stackOffset,
        scale: (index) => 1 - index * scaleStep,
        rotationX: 0,
        autoAlpha: (index) => index < visibleCards ? 1 : 0,
        // Keep phone cards on the same rendering layer across the pin boundary.
        force3D: mobile ? true : "auto",
        willChange: mobile ? "transform" : "auto",
        transformOrigin: "center bottom",
      });

      // Assemble the full timeline before ScrollTrigger measures and pins it.
      const timeline = gsap.timeline({ paused: true });
      if (initialHold) timeline.to({}, { duration: initialHold });

      // Let the final picture leave with the section instead of peeling it into
      // an empty deck and spending another full swipe on the blank space.
      for (let index = 0; index < cards.length - 1; index += 1) {
        const position = index + initialHold;
        timeline.fromTo(
          cards[index],
          { y: 0, scale: 1, rotationX: 0, autoAlpha: 1 },
          {
            y: () => exitY(cards[index]),
            rotationX,
            duration: 1,
            ease: "none",
            immediateRender: false,
          },
          position
        );
        timeline.set(cards[index], { autoAlpha: 0 }, position + 1);

        // Only the next visible stack layers need to move. Distant phone cards
        // stay hidden until their turn, avoiding five large overlapping textures.
        timeline.fromTo(
          cards.slice(index + 1, index + 1 + visibleCards),
          {
            y: (stackIndex) => (stackIndex + 1) * stackOffset,
            scale: (stackIndex) => 1 - (stackIndex + 1) * scaleStep,
            autoAlpha: (stackIndex) => stackIndex < visibleCards - 1 ? 1 : 0,
          },
          {
            y: (stackIndex) => stackIndex * stackOffset,
            scale: (stackIndex) => 1 - stackIndex * scaleStep,
            duration: 1,
            ease: "none",
            autoAlpha: 1,
            immediateRender: false,
          },
          position
        );
      }

      const scrollTrigger = ScrollTrigger.create({
        animation: timeline,
        trigger: section,
        start: () => `top top+=${navbarHeight()}`,
        end: () => `+=${settings().scrollDistance}`,
        pin: section,
        pinSpacing: true,
        scrub,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onToggle: ({ isActive }) => {
          if (!mobile) {
            gsap.set(cards, { willChange: isActive ? "transform" : "auto" });
          }
        },
      });

      return () => {
        scrollTrigger.kill();
        timeline.kill();
        section.classList.remove("is-animated");
        gsap.set(cards, { clearProps: "transform,zIndex,willChange,transformOrigin,opacity,visibility" });
      };
    }
  );

  return () => media.revert();
}
