"use client";

import Link from "next/link";
import { useEffect } from "react";

// Lightweight client-side redirect to the default locale. Netlify's
// [[redirects]] in netlify.toml handles "/" → "/en/" at the edge in
// production; this is the SPA fallback when the static HTML is served
// directly (e.g. local preview).
export default function RootRedirect() {
  useEffect(() => {
    window.location.replace("/en/");
  }, []);

  return (
    <div
      style={{
        minHeight: "60vh",
        display: "grid",
        placeItems: "center",
        padding: "2rem",
        fontFamily: "system-ui, sans-serif",
        color: "#0b1830",
      }}
    >
      <p>
        Redirecting to <Link href="/en/">English</Link> /{" "}
        <Link href="/es/">Español</Link>…
      </p>
    </div>
  );
}
