import React from "react";
import type { Location } from "../../../../types/Location";
import DetailCard from "../../components/common/DetailCard";
import Link from "next/link";
import Card from "../../components/common/Card";

interface LocationPageProps {
  params: { id: string };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const res = await fetch(`http://localhost:3000/api/location/${params.id}`);
  const location: Location = await res.json();

  const fields = [
    { label: "Тип", value: location.type, accentColor: "#39ff14" },
    { label: "Измерение", value: location.dimension, accentColor: "#a259ff" },
    {
      label: "Создан",
      value: new Date(location.created).toLocaleString(),
      accentColor: "#39ff14",
    },
  ];

  const residents = await Promise.all(
    location.residents.map((url) => fetch(url).then((res) => res.json()))
  );

  return (
    <>
      <DetailCard title={location.name} fields={fields} />
      <div style={{ marginTop: 32 }}>
        <p>
          <b style={{ color: "#39ff14" }}>Жители:</b>
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            alignItems: "stretch",
            overflow: "visible",
          }}
        >
          {residents.map((char) => (
            <Card
              key={char.id}
              href={`/characters/${char.id}`}
              title={char.name}
              image={char.image}
              fields={[
                { label: "Статус", value: char.status, color: "#39ff14" },
                { label: "Вид", value: char.species, color: "#a259ff" },
              ]}
            />
          ))}
        </div>
      </div>
      <Link
        href="/location"
        style={{
          display: "inline-block",
          margin: "24px auto 0 auto",
          background: "#fff700",
          color: "#222",
          fontWeight: 900,
          fontFamily: "Luckiest Guy, cursive",
          border: "3px solid #39ff14",
          borderRadius: 16,
          padding: "10px 28px",
          textDecoration: "none",
          boxShadow: "0 2px 12px #00e6ff44",
          outline: "3px solid #a259ff44",
          fontSize: "1.1rem",
          transition:
            "background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.15s",
          maxWidth: 300,
          textAlign: "center",
        }}
      >
        Назад к локациям
      </Link>
    </>
  );
}
