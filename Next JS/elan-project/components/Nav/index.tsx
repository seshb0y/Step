"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navigation = () => {
  const pathname = usePathname();
  return (
    <nav className="flex gap-x-5 text-lightgray font-extralight">
      <Link
        href="/"
        className={`hover:text-primary active:text-primary ${
          pathname === "/" ? "text-primary" : ""
        }`}
      >
        Квартиры
      </Link>
      <Link
        href="/houses"
        className={`hover:text-primary ${
          pathname.includes("/houses") ? "text-primary" : ""
        }`}
      >
        Коттеджы
      </Link>
      <Link
        href={"/cars"}
        className={`hover:text-primary ${
          pathname.includes("/cars") ? "text-primary" : ""
        }`}
      >
        Аренды авто
      </Link>
      <Link
        href={"/block"}
        className={`hover:text-primary ${
          pathname.includes("/block") ? "text-primary" : ""
        }`}
      >
        Блог
      </Link>
      <Link
        href={"/contacts"}
        className={`hover:text-primary ${
          pathname.includes("/contacts") ? "text-primary" : ""
        }`}
      >
        Контакты
      </Link>
    </nav>
  );
};

export default Navigation;
