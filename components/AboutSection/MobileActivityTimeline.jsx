"use client";

import { useEffect, useId, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { mobileTimelineGeometry } from "./mobileTimelineGeometry";

export default function MobileActivityTimeline({ activities }) {
  const containerRef = useRef(null);
  const maskId = useId().replace(/:/g, "");
  const [geometry, setGeometry] = useState(null);

  useEffect(() => {
    const container = containerRef.current;
    let frame;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = container.getBoundingClientRect();
        if (!bounds.width) return;
        const rows = Array.from(container.querySelectorAll("[data-mobile-row]"), (row) => {
          const rowBounds = row.getBoundingClientRect();
          const anchors = Array.from(row.querySelectorAll("[data-mobile-anchor]"), (anchor) => anchor.getBoundingClientRect())
            .sort((a, b) => a.left - b.left);
          return {
            y: rowBounds.top - bounds.top + rowBounds.height / 2,
            left: anchors[0].right - bounds.left,
            right: anchors[1].left - bounds.left,
          };
        });
        const next = mobileTimelineGeometry(bounds.width, bounds.height, rows);
        setGeometry((current) => JSON.stringify(current) === JSON.stringify(next) ? current : next);
      });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    container.querySelectorAll("[data-mobile-row]").forEach((row) => observer.observe(row));
    measure();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!geometry) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        const railMask = containerRef.current.querySelector("[data-rail-mask]");
        const length = railMask.getTotalLength();
        gsap.fromTo(railMask,
          { strokeDasharray: length, strokeDashoffset: length },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 78%",
              end: "bottom 75%",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          }
        );
        const rows = containerRef.current.querySelectorAll("[data-mobile-row]");
        rows.forEach((row, index) => {
          const connector = containerRef.current.querySelector(`[data-connector-mask="${index}"]`);
          const connectorLength = connector.getTotalLength();
          const dot = containerRef.current.querySelector(`[data-mobile-dot="${index}"]`);
          gsap.timeline({ scrollTrigger: { trigger: row, start: "top 78%", once: true } })
            .fromTo(connector,
              { strokeDasharray: connectorLength, strokeDashoffset: connectorLength },
              { strokeDashoffset: 0, duration: 0.7, ease: "power1.inOut" })
            .from(dot, { opacity: 0, scale: 0.5, transformOrigin: "center", duration: 0.4 }, 0)
            .from(row.querySelector("[data-mobile-icon]"), {
              opacity: 0, y: 24, scale: 0.9, duration: 0.7, ease: "back.out(1.5)",
              clearProps: "transform,opacity",
            }, 0.1)
            .from(row.querySelector("[data-mobile-card]"), {
              opacity: 0, y: 20, duration: 0.6, ease: "power2.out",
              clearProps: "transform,opacity",
            }, 0.2);
        });
      }, containerRef);
      return () => context.revert();
    });
    // Recalculate the line endpoints after resizing or font wrapping changes.
    ScrollTrigger.refresh();
    return () => media.revert();
  }, [geometry]);

  return (
    <div ref={containerRef} className="lg:hidden relative py-4 max-w-md mx-auto">
      {geometry && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox={`0 0 ${geometry.width} ${geometry.height}`} fill="none" aria-hidden="true">
          <defs>
            <mask id={`${maskId}-rail`} maskUnits="userSpaceOnUse" x="0" y="0" width={geometry.width} height={geometry.height}>
              <path data-rail-mask d={geometry.rail} stroke="white" strokeWidth="8" />
            </mask>
            {geometry.rows.map((row, index) => (
              <mask key={index} id={`${maskId}-${index}`} maskUnits="userSpaceOnUse" x="0" y="0" width={geometry.width} height={geometry.height}>
                <path data-connector-mask={index} d={`M ${row.left} ${row.y} H ${row.right}`} stroke="white" strokeWidth="8" />
              </mask>
            ))}
          </defs>
          <path d={geometry.rail} stroke="#94A3B8" strokeWidth="2.5" strokeDasharray="5 6" strokeOpacity="0.6" mask={`url(#${maskId}-rail)`} />
          {geometry.rows.map((row, index) => (
            <g key={index}>
              <path d={`M ${row.left} ${row.y} H ${row.right}`} stroke={activities[index].color} strokeWidth="2" strokeDasharray="3 3" mask={`url(#${maskId}-${index})`} />
              <circle data-mobile-dot={index} cx={geometry.center} cy={row.y} r="5" fill={activities[index].color} />
            </g>
          ))}
        </svg>
      )}
      <div className="relative space-y-8">
        {activities.map((activity, index) => (
          <div key={activity.title} data-mobile-row className="grid grid-cols-[minmax(0,1fr)_32px_minmax(0,1fr)] items-center min-h-[90px]">
            <div className={`row-start-1 flex justify-center ${index % 2 === 0 ? "col-start-1" : "col-start-3"}`}>
              <div data-mobile-anchor>
                <div data-mobile-icon className={`w-16 h-16 rounded-2xl ${activity.bgCard} ${activity.borderCard} border shadow-md ${activity.shadowCard} flex items-center justify-center`} style={{ color: activity.color }}>
                  {activity.icon}
                </div>
              </div>
            </div>
            <div className={`row-start-1 ${index % 2 === 0 ? "col-start-3" : "col-start-1"}`} data-mobile-anchor>
              <div data-mobile-card className={`p-3.5 rounded-2xl bg-bg-alt dark:bg-zinc-900 border ${activity.borderCard} shadow-sm`}>
                <h4 className="text-sm font-bold text-fg tracking-tight mb-0.5">{activity.title}</h4>
                <p className="text-[11px] text-fg-muted leading-relaxed">{activity.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
