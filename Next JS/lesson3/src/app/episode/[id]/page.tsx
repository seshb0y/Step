import React from "react";
import { Episode } from "../../../../types/Episode";
import DetailCard from "../../components/common/DetailCard";
import Link from "next/link";
import Card from "../../components/common/Card";

interface EpisodePageProps {
  params: { id: string };
}

export default async function EpisodePage({ params }: EpisodePageProps) {
  const res = await fetch(`http://localhost:3000/api/episode/${params.id}`);
  const episode: Episode = await res.json();

  const fields = [
    { label: "Дата выхода", value: episode.air_date, accentColor: "#39ff14" },
    { label: "Код эпизода", value: episode.episode, accentColor: "#a259ff" },
    {
      label: "Создан",
      value: new Date(episode.created).toLocaleString(),
      accentColor: "#39ff14",
    },
  ];

  const characters = await Promise.all(
    episode.characters.map((url) => fetch(url).then((res) => res.json()))
  );

  return (
    <>
      <DetailCard title={episode.name} fields={fields} />
      <div style={{ marginTop: 32 }}>
        <p>
          <b style={{ color: "#39ff14" }}>Персонажи:</b>
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
          {characters.map((char) => (
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
        href="/episode"
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
        Назад к эпизодам
      </Link>
    </>
  );
}
