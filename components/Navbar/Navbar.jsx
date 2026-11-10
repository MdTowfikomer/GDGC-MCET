"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import "./Navbar.css";

const NAV_ITEMS = [
  { label: "Home", id: "hero-section" },
  { label: "About", id: "about" },
  { label: "Benefits", id: "benefits" },
  { label: "Events", id: "events" },
  { label: "Team", id: "team" },
];

function Navbar() {
  const [activeSection, setActiveSection] = useState("hero-section");
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map(({ id }) => document.getElementById(id)).filter(Boolean);
    let animationFrame = null;

    const updateActiveSection = () => {
      animationFrame = null;
      const navbarHeight = document.querySelector(".navbar")?.getBoundingClientRect().height ?? 0;
      const activationPoint = navbarHeight + 1;
      let activeSection = null;
      let nearestSection = null;
      let nearestDistance = Infinity;

      sections.forEach((section) => {
        const { top, bottom } = section.getBoundingClientRect();
        if (top <= activationPoint && bottom > activationPoint) {
          if (!activeSection || top > activeSection.top) {
            activeSection = { id: section.id, top };
          }
          return;
        }

        const distance = top > activationPoint ? top - activationPoint : activationPoint - bottom;
        if (distance < nearestDistance) {
          nearestSection = section;
          nearestDistance = distance;
        }
      });

      setActiveSection(activeSection?.id ?? nearestSection?.id ?? NAV_ITEMS[0].id);
    };

    const scheduleActiveSectionUpdate = () => {
      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(updateActiveSection);
      }
    };

    updateActiveSection();
    window.addEventListener("scroll", scheduleActiveSectionUpdate, { passive: true });
    window.addEventListener("resize", scheduleActiveSectionUpdate);
    window.addEventListener("hashchange", scheduleActiveSectionUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleActiveSectionUpdate);
      window.removeEventListener("resize", scheduleActiveSectionUpdate);
      window.removeEventListener("hashchange", scheduleActiveSectionUpdate);
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const handleNavigation = (id) => {
    setActiveSection(id);
    setMenuOpen(false);
  };

  const toggleTheme = () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    setTheme(nextTheme);

    try {
      window.localStorage.setItem("theme", nextTheme);
    } catch (error) {
      console.error("Could not save the selected theme.", error);
    }
  };

  const renderThemeToggle = (className) => (
    <button
      type="button"
      className={className}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      aria-pressed={theme === "dark"}
    >
      {theme === "dark" ? (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" />
        </svg>
      )}
    </button>
  );

  const renderLinks = (className) => (
    <nav aria-label="Primary navigation" className={className}>
      {NAV_ITEMS.map(({ label, id }) => (
        <a
          key={id}
          href={`#${id}`}
          className={`navbar-link${activeSection === id ? " is-active" : ""}`}
          aria-current={activeSection === id ? "location" : undefined}
          onClick={(e) => {
            if (id === "hero-section" && typeof window !== "undefined" && window.scrollY < 40) {
              window.location.reload();
            } else {
              handleNavigation(id);
            }
          }}
        >
          {label}
        </a>
      ))}
    </nav>
  );

  return (
    <>
      {menuOpen && (
        <button
          type="button"
          className="navbar-backdrop"
          aria-label="Close navigation menu"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <header className="navbar">
        <div className="navbar-inner">
          <a
            href="#hero-section"
            className="navbar-brand"
            aria-label="Google Developer Group at Methodist College of Engineering And Technology home"
            onClick={(e) => {
              if (typeof window !== "undefined" && window.scrollY < 40) {
                window.location.reload();
              } else {
                handleNavigation("hero-section");
              }
            }}
          >
            <Image
              src="/gdgc-logo.png"
              width={225}
              height={225}
              alt="GDGC on Campus"
              unoptimized
            />
            <span className="navbar-brand-name" aria-hidden="true">
              <span className="navbar-brand-gdgc">Google Developer Group</span>
              <span className="navbar-brand-affiliation navbar-brand-affiliation-desktop">
                Methodist College of Engineering And Technology
              </span>
              <span className="navbar-brand-affiliation navbar-brand-affiliation-mobile">
                Methodist College of Engineering
              </span>
            </span>
          </a>

          {renderLinks("navbar-links")}

          <div className="navbar-desktop-theme">{renderThemeToggle("navbar-theme-toggle")}</div>

          <div className="navbar-mobile-controls">
            {renderThemeToggle("navbar-theme-toggle")}
            <button
              type="button"
              className={`navbar-menu-toggle${menuOpen ? " is-open" : ""}`}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls={menuOpen ? "navbar-mobile-links" : undefined}
              onClick={() => setMenuOpen((isOpen) => !isOpen)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div id="navbar-mobile-links" className="navbar-mobile-panel">
            {renderLinks("navbar-mobile-links-list")}
          </div>
        )}
      </header>
    </>
  );
}

export default Navbar;
