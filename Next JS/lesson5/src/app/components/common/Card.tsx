"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface CardField {
  label: string;
  value: string | React.ReactNode;
  color?: string;
}

interface CardProps {
  href: string;
  title: string;
  image?: string;
  fields: CardField[];
}

const Card: React.FC<CardProps> = ({ href, title, image, fields }) => (
  <Link
    href={href}
    style={{ textDecoration: "none", maxWidth: 300, flex: "1 1 300px" }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background:
          "radial-gradient(circle at 60% 40%, #eaffd0 0%, #fff700 60%, #7fff00 100%)",
        border: "5px solid #39ff14",
        borderRadius: "32px 24px 36px 28px/28px 36px 24px 32px",
        boxShadow:
          "0 0 32px #7fff00cc, 0 0 0 8px #fff70055, 0 8px 32px #a259ff44, 0 0 0 6px #fff70044",
        padding: "32px 24px 24px 24px",
        margin: "0 auto",
        minWidth: 240,
        minHeight: 340,
        transition:
          "border 0.2s, box-shadow 0.2s, transform 0.18s cubic-bezier(.68,-0.55,.27,1.55)",
        outline: "5px solid #a259ff44",
        position: "relative",
        overflow: "hidden",
        animation: "jelly 0.7s cubic-bezier(.68,-0.55,.27,1.55)",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform =
          "scale(1.04) rotate(-2deg)";
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 0 48px #fff700cc, 0 0 0 12px #7fff0044, 0 8px 32px #a259ff77";
        (e.currentTarget as HTMLDivElement).style.border = "5px solid #fff700";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform =
          "scale(1) rotate(0)";
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 0 32px #7fff00cc, 0 0 0 8px #fff70055, 0 8px 32px #a259ff44, 0 0 0 6px #fff70044";
        (e.currentTarget as HTMLDivElement).style.border = "5px solid #39ff14";
      }}
    >
      {image && (
        <Image
          src={image}
          alt={title}
          width={160}
          height={160}
          style={{
            borderRadius: "22px",
            marginBottom: "18px",
            border: "4px solid #fff700",
            boxShadow: "0 0 24px #39ff14, 0 0 0 4px #a259ff44",
            background: "#fff",
          }}
        />
      )}
      <h3
        style={{
          color: "#a259ff", // насыщенный фиолетовый
          margin: "12px 0 8px 0",
          textAlign: "center",
          fontSize: "1.5rem",
          textShadow: "0 2px 4px #fff, 0 0 2px #000, 0 0 8px #7fff00",
          fontWeight: 900,
          letterSpacing: 1,
          WebkitTextStroke: "0.5px #fff",
          borderRadius: "8px",
          padding: "2px 8px",
        }}
      >
        {title}
      </h3>
      {fields.map((field, idx) => (
        <p
          key={idx}
          style={{
            color: field.color || "#222",
            margin: "0 0 8px 0",
            fontWeight: 900,
            fontSize: "1.15rem",
            textShadow: "1px 1px 0 #fff, 0 0 8px #7fff00, 0 0 2px #fff700",
            letterSpacing: 1,
          }}
        >
          {field.label}: {field.value}
        </p>
      ))}
    </div>
  </Link>
);

export default Card;
