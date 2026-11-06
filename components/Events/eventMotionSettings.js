export function eventMotionSettings({ desktop, tablet }, viewportHeight, cardCount) {
  const mobile = !desktop && !tablet;
  const transitions = Math.max(0, cardCount - 1);
  const distancePerCard = viewportHeight * (mobile ? 0.55 : tablet ? 0.65 : 0.72);

  return {
    stackOffset: desktop ? 24 : tablet ? 18 : 12,
    scaleStep: desktop ? 0.04 : tablet ? 0.03 : 0,
    visibleCards: Math.min(3, cardCount),
    rotationX: 0,
    scrub: mobile ? 0.25 : 0.3,
    initialHold: mobile ? 0.12 : 0.08,
    scrollDistance: transitions * Math.max(240, distancePerCard),
  };
}
