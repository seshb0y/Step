import Link from "next/link";
import React from "react";

const NavMenu = () => (
  <nav>
    <Link href="/about">About</Link>{" "}
    <Link href="/dashboard/analytics">Dashboard</Link>{" "}
    <Link href="/users">Users</Link> <Link href="/">Основная страница</Link>
  </nav>
);

export default NavMenu;
