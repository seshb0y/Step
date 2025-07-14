import NavMenu from "./components/NavMenu";
import "./globals.css";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "32px 0 0 0",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse
                cx="30"
                cy="30"
                rx="28"
                ry="20"
                fill="#7fff00"
                stroke="#39ff14"
                strokeWidth="4"
              />
              <ellipse
                cx="30"
                cy="30"
                rx="18"
                ry="12"
                fill="#fff700"
                fillOpacity="0.7"
              />
              <ellipse
                cx="30"
                cy="30"
                rx="10"
                ry="6"
                fill="#00e6ff"
                fillOpacity="0.5"
              />
            </svg>
            <h1
              style={{
                fontFamily: "Luckiest Guy, cursive",
                fontSize: "2.8rem",
                color: "#4cc234",
                textShadow: "0 0 16px #7fff00, 0 0 2px #fff, 0 0 32px #fff700",
                margin: 0,
                letterSpacing: "2px",
                fontWeight: 900,
                textAlign: "center",
                lineHeight: 1.1,
              }}
            >
              Rick & Morty{" "}
              <span style={{ color: "#a259ff", textShadow: "0 0 8px #fff700" }}>
                Universe
              </span>
            </h1>
          </div>
        </header>
        <main>
          <NavMenu />
          {children}
        </main>
      </body>
    </html>
  );
}
