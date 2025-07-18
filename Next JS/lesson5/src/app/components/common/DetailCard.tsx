import React from "react";
import Image from "next/image";
import Card from "./Card";

interface DetailField {
  label: string;
  value: string | React.ReactNode;
  accentColor?: string;
}

interface DetailLink {
  label: string;
  urls: string[];
  accentColor?: string;
}

interface DetailCardProps {
  title: string;
  image?: string;
  fields: DetailField[];
  links?: DetailLink[];
  children?: React.ReactNode;
}

const DetailCard: React.FC<DetailCardProps> = ({
  title,
  image,
  fields,
  links,
  children,
}) => (
  <div
    style={{
      maxWidth: "520px",
      margin: "40px auto",
      background:
        "radial-gradient(circle at 60% 40%, #fff700 0%, #eaffd0 60%, #7fff00 100%)",
      border: "5px dashed #39ff14",
      borderRadius: "36px 28px 40px 32px/32px 40px 28px 36px",
      padding: "40px 32px 32px 32px",
      boxShadow:
        "0 0 48px #7fff00a0, 0 0 0 10px #fff70055, 0 8px 32px #a259ff44",
      color: "#222",
      outline: "5px solid #a259ff44",
      position: "relative",
      overflow: "hidden",
      animation: "jelly 0.7s cubic-bezier(.68,-0.55,.27,1.55)",
    }}
  >
    {image && (
      <Image
        src={image}
        alt={title}
        width={180}
        height={180}
        style={{
          borderRadius: "24px",
          marginBottom: "18px",
          border: "4px solid #fff700",
          boxShadow: "0 0 20px #39ff14, 0 0 0 4px #a259ff44",
          background: "#fff",
        }}
      />
    )}
    <h1
      style={{
        color: "#a259ff",
        marginBottom: "12px",
        textShadow: "2px 2px 0 #fff700, 0 0 12px #7fff00, 0 0 2px #fff",
        fontWeight: 900,
        fontSize: "2rem",
      }}
    >
      {title}
    </h1>
    {fields.map((field, idx) => (
      <p key={idx}>
        <b style={{ color: field.accentColor || "#39ff14" }}>{field.label}:</b>{" "}
        {field.value}
      </p>
    ))}
    {links &&
      links.map((link, idx) => (
        <div key={idx}>
          <p>
            <b style={{ color: link.accentColor || "#39ff14" }}>
              {link.label}:
            </b>
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            {link.urls.map((url) => {
              const id = url.split("/").pop();
              return (
                <Card
                  key={url}
                  href={`/episode/${id}`}
                  title={id || url}
                  fields={[]}
                />
              );
            })}
          </div>
        </div>
      ))}
    {children}
  </div>
);

export default DetailCard;
