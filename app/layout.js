import './globals.css'

export const metadata = {
  title: 'GDGC MCET',
  description:
    'Official website of Google Developer Groups on Campus at Methodist College of Engineering and Technology.',
  icons: {
    icon: '/gdgc-logo.png',
  },
  openGraph: {
    title: 'GDGC MCET',
    description:
      'Google Developer Groups on Campus at Methodist College of Engineering and Technology.',
    type: 'website',
  },
}

// Tiny script that runs synchronously before the body paints. It reads the
// theme the user previously picked from localStorage and applies the
// corresponding `data-theme` attribute on the <html> element. Without this,
// the page would flash the default light theme for one frame on every reload
// when the user is using dark mode. Default is light when nothing is saved.
const themeBootstrap = `
(function () {
  try {
    var saved = localStorage.getItem('theme');
    var theme = saved === 'dark' ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
  } catch (e) {
    document.documentElement.dataset.theme = 'light';
  }
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
