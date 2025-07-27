import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

interface ApartmentPageProps {
  params: { apartmentId: string };
}

export default async function ApartmentPage({ params }: ApartmentPageProps) {
  const id = Number(params.apartmentId);
  if (isNaN(id)) return notFound();

  const apartment = await prisma.apartment.findUnique({ where: { id } });
  if (!apartment) return notFound();

  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <div className="rounded-2xl shadow-xl bg-white p-8 border border-gray-100">
        <h1 className="text-3xl font-bold mb-4 text-blue-800">{apartment.address}</h1>
        <div className="flex items-center gap-4 mb-4">
          <span className="text-2xl font-semibold text-green-700">{apartment.price1} / {apartment.price2} / {apartment.price3} ₽</span>
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">{apartment.metro}</span>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-gray-700">Комнат: <span className="font-medium">{apartment.room}</span></div>
          <div className="text-gray-700">Спальных мест: <span className="font-medium">{apartment.sleepPlaces}</span></div>
          <div className="text-gray-700">Площадь: <span className="font-medium">{apartment.mainArea} м²</span></div>
          <div className="text-gray-700">Жилая: <span className="font-medium">{apartment.livingSpace} м²</span></div>
          <div className="text-gray-700">Кухня: <span className="font-medium">{apartment.kitchenSpace} м²</span></div>
        </div>
        <div className="mb-4">
          <div className="text-gray-600 mb-1">Особенности: <span className="text-gray-800">{apartment.features?.join(", ")}</span></div>
          <div className="text-gray-600 mb-1">Ориентиры: <span className="text-gray-800">{apartment.landmarks?.join(", ")}</span></div>
        </div>
        <div className="mb-4">
          <div className="text-gray-800 font-semibold mb-1">Описание:</div>
          <div className="text-gray-700 whitespace-pre-line">{apartment.description}</div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs">Публичная: {apartment.isPublic ? "Да" : "Нет"}</span>
          <span className="px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs">Премиум: {apartment.isPremium ? "Да" : "Нет"}</span>
          <span className="px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs">Активна: {apartment.isActive ? "Да" : "Нет"}</span>
          <span className="px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs">Удалена: {apartment.isDeleted ? "Да" : "Нет"}</span>
        </div>
        <div className="text-gray-400 text-xs mb-4">Создана: {apartment.createdAt.toLocaleString()} | Обновлена: {apartment.updatedAt.toLocaleString()}</div>
        {apartment.images && apartment.images.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Фотографии</h2>
            <div className="flex gap-4 flex-wrap">
              {apartment.images.map((img: string, idx: number) => (
                <img key={idx} src={img} alt="apartment" width={160} className="rounded-lg border" />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
