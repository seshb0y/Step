"use client";
import React, { useEffect, useState } from "react";
import type { Location as LocationType } from "../../../types/Location";
import Card from "../components/common/Card";

const Location = () => {
  const [locations, setLocations] = useState<LocationType[]>([]);

  useEffect(() => {
    async function fetchLocations() {
      const res = await fetch("/api/location");
      const data = await res.json();
      setLocations(data.results);
    }
    fetchLocations();
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
      {locations.map((loc) => (
        <Card
          key={loc.id}
          href={`/location/${loc.id}`}
          title={loc.name}
          fields={[
            { label: "Тип", value: loc.type, color: "#39ff14" },
            { label: "Измерение", value: loc.dimension, color: "#a259ff" },
            {
              label: "Создан",
              value: new Date(loc.created).toLocaleDateString(),
            },
          ]}
        />
      ))}
    </div>
  );
};

export default Location;
