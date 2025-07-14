"use client";

import React, { useEffect, useState } from "react";
import type { Episode as EpisodeType } from "../../../types/Episode";
import Card from "../components/common/Card";

const Episode = () => {
  const [episodes, setEpisodes] = useState<EpisodeType[]>([]);

  useEffect(() => {
    async function fetchEpisodes() {
      const res = await fetch("/api/episode");
      const data = await res.json();
      setEpisodes(data.results);
    }
    fetchEpisodes();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "40px",
        justifyContent: "center",
      }}
    >
      {episodes.map((ep) => (
        <Card
          key={ep.id}
          href={`/episode/${ep.id}`}
          title={ep.name}
          fields={[
            { label: "Дата выхода", value: ep.air_date, color: "#39ff14" },
            { label: "Код эпизода", value: ep.episode, color: "#a259ff" },
            {
              label: "Создан",
              value: new Date(ep.created).toLocaleDateString(),
            },
          ]}
        />
      ))}
    </div>
  );
};

export default Episode;
