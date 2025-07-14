import NavMenu from "./components/NavMenu";
import React from "react";
import "./globals.css";
import Logo from "./components/Logo";
import Search from "./components/Search";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <header>
          <Logo />
          <Search/>
        </header>
        <main>
          <NavMenu />
          {children}
        </main>
      </body>
    </html>
  );
};

export default DashboardLayout;
