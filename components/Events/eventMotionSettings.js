export function eventMotionSettings({ desktop, tablet }, viewportHeight, cardCount) {
  const mobile = !desktop && !tablet;
  const transitions = Math.max(0, cardCount - 1);
  const distancePerCard = viewportHeight * (mobile ? 0.55 : tablet ? 0.85 : 1.15);

  return {
    stackOffset: desktop ? 28 : tablet ? 20 : 12,
    scaleStep: desktop ? 0.045 : tablet ? 0.03 : 0.015,
    rotationX: desktop ? 35 : tablet ? 18 : 0,
    scrub: mobile ? 0.25 : 0.6,
    initialHold: mobile ? 0.12 : 0,
    scrollDistance: transitions * Math.max(240, distancePerCard),
  };
}
