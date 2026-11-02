// Use measured row/anchor bounds so wrapped copy cannot separate the connectors.
export function mobileTimelineGeometry(width, height, rows) {
  const center = width / 2;
  const bend = Math.min(28, width * 0.07);
  if (!rows.length || !width) return null;

  let rail = `M ${center} ${Math.max(0, rows[0].y - 36)}`;
  let previousY = Math.max(0, rows[0].y - 36);
  rows.forEach((row, index) => {
    const direction = index % 2 === 0 ? 1 : -1;
    const distance = row.y - previousY;
    rail += ` C ${center + bend * direction} ${previousY + distance / 3}, ${center + bend * direction} ${row.y - distance / 3}, ${center} ${row.y}`;
    previousY = row.y;
  });
  rail += ` Q ${center - bend} ${previousY + 18}, ${center} ${Math.min(height, previousY + 36)}`;

  return { width, height, center, rail, rows };
}
