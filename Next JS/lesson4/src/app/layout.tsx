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
        <main>
          <NavMenu />
          {children}
        </main>
      </body>
    </html>
  );
}
