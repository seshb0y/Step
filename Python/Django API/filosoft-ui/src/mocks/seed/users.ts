import type { User } from "@/entities/user/model/user";

const first = [
  "Elvin",
  "Samir",
  "Fuad",
  "Shakir",
  "Elmira",
  "Aysel",
  "Murad",
  "Ramil",
  "Nigar",
  "Lale",
];
const last = [
  "Aliyev",
  "Mammadov",
  "Huseynov",
  "Ismayilov",
  "Mustafayev",
  "Rzayev",
  "Guliyev",
  "Hasanov",
  "Jafarov",
  "Valiyev",
];

function full(i: number) {
  const f = first[i % first.length];
  const l = last[i % last.length];
  return `${f} ${l}`;
}

export const usersSeed: User[] = Array.from({ length: 137 }).map((_, i) => {
  const name = full(i);
  const email = name.toLowerCase().replace(/\s+/g, ".") + "@example.az";
  return {
    id: String(i + 1),
    userName: name,
    email,
    isEmailConfirmed: i % 3 === 0,
  };
});
