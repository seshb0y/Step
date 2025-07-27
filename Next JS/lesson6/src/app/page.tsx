"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [response, setResponse] = useState("");
  const [responseType, setResponseType] = useState("");
  const [items, setItems] = useState<Array<Record<string, any>>>([]);

  const callCharacter = async () => {
    const res = await fetch("/api/character");
    const data = await res.json();
    setItems(data.results);
    setResponseType("character");
    setResponse("");
  };

  const callEpisode = async () => {
    const res = await fetch("/api/episode");
    const data = await res.json();
    setItems(data.results);
    setResponseType("episode");
    setResponse("");
  };

  const callLocation = async () => {
    const res = await fetch("/api/location");
    const data = await res.json();
    setItems(data.results);
    setResponseType("location");
    setResponse("");
  };

  const callHello = async () => {
    const res = await fetch("/api/hello");
    const data = await res.json();
    setResponse(data.message);
    setResponseType("");
    setItems([]);
  };

  const callSedrick = async () => {
    const res = await fetch("/api/hello?name=Sedrick", {
      method: "POST",
    });
    const data = await res.json();
    setResponse(data.message);
    setResponseType("");
    setItems([]);
  };

  const callAlex = async () => {
    const res = await fetch("/api/hello?name=Alex", { method: "POST" });
    const data = await res.json();
    setResponse(data.message);
    setResponseType("");
    setItems([]);
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <button
        onClick={callSedrick}
        className="px-4 py-2 bg-green-500 text-black rounded"
      >
        Поздороваться с Sedrick
      </button>
      <button
        onClick={callAlex}
        className="px-4 py-2 bg-green-500 text-black rounded"
      >
        Поздороваться с Alex
      </button>
      <button
        onClick={callHello}
        className="px-4 py-2 bg-green-500 text-black rounded"
      >
        Поздороваться со всеми
      </button>

      <button
        onClick={callCharacter}
        className="px-4 py-2 bg-green-500 text-black rounded"
      >
        Показать персонажей
      </button>

      <button
        onClick={callEpisode}
        className="px-4 py-2 bg-green-500 text-black rounded"
      >
        Показать эпизоды
      </button>

      <button
        onClick={callLocation}
        className="px-4 py-2 bg-green-500 text-black rounded"
      >
        Показать локации
      </button>

      {/* Стилизованный вывод для Rick and Morty */}
      {responseType === "character" && items.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 w-full max-w-4xl">
          {items.map((char) => (
            <div
              key={char.id}
              className="flex items-center gap-4 p-4 bg-white rounded shadow"
            >
              <img
                src={char.image}
                alt={char.name}
                className="w-16 h-16 rounded-full border"
              />
              <div>
                <div className="font-bold text-lg">{char.name}</div>
                <div className="text-gray-500 text-sm">{char.species}</div>
              </div>
            </div>
          ))}
        </div>
      )}
      {responseType === "episode" && items.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 w-full max-w-4xl">
          {items.map((ep) => (
            <div key={ep.id} className="p-4 bg-white rounded shadow">
              <div className="font-bold text-lg">{ep.name}</div>
              <div className="text-gray-500 text-sm">{ep.episode}</div>
            </div>
          ))}
        </div>
      )}
      {responseType === "location" && items.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 w-full max-w-4xl">
          {items.map((loc) => (
            <div key={loc.id} className="p-4 bg-white rounded shadow">
              <div className="font-bold text-lg">{loc.name}</div>
              <div className="text-gray-500 text-sm">{loc.type}</div>
            </div>
          ))}
        </div>
      )}
      {/* Универсальный вывод для остальных случаев */}
      {response && (
        <pre className="mt-4 p-4 border rounded bg-gray-100 text-sm overflow-x-auto">
          {response}
        </pre>
      )}
    </div>
  );
}
