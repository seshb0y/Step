import Link from "next/link";
import prisma from "../lib/prisma";
import AddApartmentForm from "./components/AddApartmentForm";

export default async function Home() {
  const apartments = await prisma.apartment.findMany();
  const users = await prisma.user.findMany();

  return (
    <main className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Список квартир</h1>
      <AddApartmentForm users={users} />
      <ul className="grid gap-6 mt-8">
        {apartments.map((apt) => (
          <li key={apt.id}>
            <Link
              href={`/${apt.id}`}
              className="block rounded-xl shadow-lg hover:shadow-2xl transition-shadow bg-white p-6 border border-gray-100 hover:border-blue-400"
            >
              <div className="flex items-center justify-between mb-2">
                <strong className="text-xl text-blue-700">{apt.address}</strong>
                <span className="text-lg font-semibold text-green-700">
                  {apt.price1} / {apt.price2} / {apt.price3} ₽
                </span>
              </div>
              <div className="text-gray-600 mb-1">
                Комнат: <span className="font-medium">{apt.room}</span>, Спальных мест: <span className="font-medium">{apt.sleepPlaces}</span>
              </div>
              <div className="text-gray-500 mb-2">{apt.metro}</div>
              <div className="text-gray-800 line-clamp-2">{apt.description}</div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
