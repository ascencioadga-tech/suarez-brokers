import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Suarez Brokerage — Your bridge between Mexico and the world",
  // Static-export friendly meta-refresh to default locale. Netlify also
  // forwards "/" → "/en/" via netlify.toml as a belt-and-braces.
  other: {
    "http-equiv": "refresh",
  },
};

export default function RootRedirect() {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="refresh" content="0; url=/en/" />
        <link rel="canonical" href="/en/" />
      </head>
      <body style={{ fontFamily: "system-ui", padding: "2rem" }}>
        <p>
          Redirecting to <Link href="/en/">English</Link> /{" "}
          <Link href="/es/">Español</Link>…
        </p>
      </body>
    </html>
  );
}
