import Card from "@/app/components/common/Card";
import { Character } from "../../../../types/Character";
import DetailCard from "../../components/common/DetailCard";
import Link from "next/link";

interface CharacterPageProps {
  params: { id: string };
}

export default async function CharacterPage({ params }: CharacterPageProps) {
  const res = await fetch(`http://localhost:3000/api/character/${params.id}`);
  const character: Character = await res.json();
  const episodes = await Promise.all(
    character.episode.map((url) => fetch(url).then((res) => res.json()))
  );
  const fields = [
    { label: "Статус", value: character.status, accentColor: "#39ff14" },
    { label: "Вид", value: character.species, accentColor: "#a259ff" },
    { label: "Тип", value: character.type || "—", accentColor: "#39ff14" },
    { label: "Гендер", value: character.gender, accentColor: "#a259ff" },
    {
      label: "Место происхождения",
      value: character.origin?.name,
      accentColor: "#39ff14",
    },
    {
      label: "Локация",
      value: character.location?.name,
      accentColor: "#a259ff",
    },
    {
      label: "Создан",
      value: new Date(character.created).toLocaleString(),
      accentColor: "#39ff14",
    },
  ];
  return (
    <>
      <DetailCard
        title={character.name}
        image={character.image}
        fields={fields}
      />
      <div style={{ marginTop: 32 }}>
        <p>
          <b style={{ color: "#39ff14" }}>Эпизоды:</b>
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16}}>
          {episodes.map((ep) => (
            <Card
              key={ep.id}
              href={`/episode/${ep.id}`}
              title={ep.name}
              fields={[
                { label: "Код", value: ep.episode, color: "#a259ff" },
                { label: "Дата", value: ep.air_date, color: "#39ff14" },
              ]}
            />
          ))}
        </div>
      </div>
      <Link
        href="/characters"
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
        Назад к персонажам
      </Link>
    </>
  );
}
