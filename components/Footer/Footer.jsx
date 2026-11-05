import Image from "next/image";
import { InstagramLogo, LinkedinLogo, MapPin } from "@phosphor-icons/react";
import "./Footer.css";

const EXPLORE_LINKS = [
  { label: "Home", id: "hero-section" },
  { label: "About", id: "about" },
  { label: "Benefits", id: "benefits" },
  { label: "Events", id: "events" },
  { label: "Team", id: "team" },
];

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-main">
        <section className="site-footer-brand" aria-labelledby="footer-brand-title">
          <a className="site-footer-brand-heading" href="#hero-section" aria-label="GDGC MCET home">
            <Image src="/gdgc-logo.png" width={48} height={48} alt="" />
            <span>
              <span id="footer-brand-title" className="site-footer-brand-name">
                Google Developer Group
              </span>
              <span className="site-footer-affiliation">
                Methodist College of Engineering And Technology
              </span>
            </span>
          </a>
          <p>
            A campus community for developers to learn, collaborate, and create what&apos;s next.
          </p>
        </section>

        <nav className="site-footer-column" aria-labelledby="footer-explore-title">
          <h2 id="footer-explore-title">Explore</h2>
          <ul>
            {EXPLORE_LINKS.map(({ label, id }) => (
              <li key={id}>
                <a href={`#${id}`}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <section className="site-footer-column" aria-labelledby="footer-social-title">
          <h2 id="footer-social-title">Social Media</h2>
          <div className="site-footer-social-links">
            <a
              href="https://www.instagram.com/gdgc_mcet/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit GDGC MCET on Instagram (opens in a new tab)"
              title="Instagram"
            >
              <InstagramLogo size={21} weight="regular" aria-hidden="true" />
            </a>
            <a
              href="https://www.linkedin.com/company/google-developer-student-club-mcet/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit GDGC MCET on LinkedIn (opens in a new tab)"
              title="LinkedIn"
            >
              <LinkedinLogo size={21} weight="regular" aria-hidden="true" />
            </a>
          </div>
        </section>

        <section
          className="site-footer-column site-footer-location"
          aria-labelledby="footer-location-title"
        >
          <h2 id="footer-location-title">Location</h2>
          <a
            className="site-footer-location-link"
            href="https://www.google.com/maps/dir/?api=1&destination=Methodist+College+of+Engineering+%26+Technology%2C+King+Koti+Road%2C+Abids%2C+Hyderabad%2C+Telangana+500001"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MapPin size={18} weight="regular" aria-hidden="true" />
            <address>
              Methodist College of Engineering and Technology,
              <br />
              Hyderabad, Telangana, India.
            </address>
          </a>
        </section>
      </div>

      <div className="site-footer-bottom">
        <p>© {new Date().getFullYear()} GDGC MCET. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
