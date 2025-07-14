"use client";

import React, { useEffect, useState } from "react";
import { Character } from "../../../types/Character";
import Card from "../components/common/Card";

const Characters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    async function fetchCharacters() {
      const res = await fetch("/api/character");
      const data = await res.json();
      setCharacters(data.results);
    }
    fetchCharacters();
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
      {characters.map((char) => (
        <Card
          key={char.id}
          href={`/characters/${char.id}`}
          title={char.name}
          image={char.image}
          fields={[
            { label: "Статус", value: char.status, color: "#39ff14" },
            {
              label: "Создан",
              value: new Date(char.created).toLocaleDateString(),
            },
          ]}
        />
      ))}
    </div>
  );
};

export default Characters;
