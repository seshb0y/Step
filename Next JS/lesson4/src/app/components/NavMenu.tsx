"use client";

import Link from "next/link";
import React from "react";

const NavMenu = () => (
  <nav>
    <Link href="/contact">Персонажи</Link>
    <Link href="/episode">Эпизоды</Link>
    <Link href="/location">Локации</Link>
  </nav>
);

export default NavMenu;
