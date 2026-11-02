# GDGC MCET

The official website for **Google Developer Groups on Campus, Methodist College of Engineering and Technology**. The site introduces the GDGC MCET community and provides its responsive homepage experience.

## Technology

- Next.js 14 and React 18
- Three.js for the LiquidEther hero background
- GSAP for the hero loader and entrance animations
- Parallax.js for interactive hero movement
- Tailwind CSS and project CSS for styling

## Development

Install the dependencies and start the development server:

```bash
npm install
npm run dev
```

Create a production build and serve it locally with:

```bash
npm run build
npm start
```

## Project structure

```text
app/
  globals.css
  layout.js
  page.js
components/
  HeroSection/
  LiquidEther/
  Navbar/
public/
```

The root layout defines page metadata and theme initialization. The homepage composes the Navbar and HeroSection. The GDGC logo is in `public/gdgc-logo.png`.

## Branding and asset review

The existing hero portraits (`public/group-img.png` and `public/hero_img_mobile.png`) were inherited from the previous portfolio implementation. Their ownership and suitability for GDGC MCET have not been verified. They are retained pending review and replacement with authorized GDGC MCET imagery.

## Licensing

The repository's `LICENSE` file contains the MIT License and a copyright notice naming Mostafa Tarif. Preserve that notice and the license terms when redistributing material covered by it; no ownership transfer is asserted here.

Third-party packages and assets have separate terms. In particular, GSAP 3.12.5 declares GSAP's Standard License, not MIT. The [GSAP Standard License](https://gsap.com/standard-license) permits website and web-application use, including commercial use, but restricts use in competing visual animation-builder products and removal or alteration of GSAP proprietary notices. Review the current terms before redistribution or changes to GSAP use.

Add only verified GDGC MCET contact, social, domain, and deployment details when they are provided by an authorized maintainer.
