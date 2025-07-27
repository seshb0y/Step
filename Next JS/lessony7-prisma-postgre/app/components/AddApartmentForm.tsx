"use client";

import { useState } from "react";
import { addApartment } from "../actions";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AddApartmentFormProps {
  users: User[];
}

export default function AddApartmentForm({ users }: AddApartmentFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    address: "",
    price1: "",
    price2: "",
    price3: "",
    sleepPlaces: "",
    room: "",
    metro: "",
    features: "",
    userId: "",
    settlementTime: "",
    settlementCond: "",
    description: "",
    images: "",
    mainArea: "",
    livingSpace: "",
    kitchenSpace: "",
    landmarks: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataObj = new FormData();
    
    Object.entries(formData).forEach(([key, value]) => {
      formDataObj.append(key, value);
    });

    await addApartment(formDataObj);
    setFormData({
      address: "",
      price1: "",
      price2: "",
      price3: "",
      sleepPlaces: "",
      room: "",
      metro: "",
      features: "",
      userId: "",
      settlementTime: "",
      settlementCond: "",
      description: "",
      images: "",
      mainArea: "",
      livingSpace: "",
      kitchenSpace: "",
      landmarks: "",
    });
    setIsOpen(false);
    window.location.reload();
  };

  return (
    <div className="mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
      >
        {isOpen ? "Скрыть форму" : "Добавить квартиру"}
      </button>

      {isOpen && (
        <form onSubmit={handleSubmit} className="mt-4 bg-white p-6 rounded-xl shadow-lg border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Адрес *
              </label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Пользователь
              </label>
              <select
                value={formData.userId}
                onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              >
                <option value="">Выберите пользователя</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Цена 1 *
              </label>
              <input
                type="number"
                required
                value={formData.price1}
                onChange={(e) => setFormData({ ...formData, price1: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Цена 2 *
              </label>
              <input
                type="number"
                required
                value={formData.price2}
                onChange={(e) => setFormData({ ...formData, price2: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Цена 3 *
              </label>
              <input
                type="number"
                required
                value={formData.price3}
                onChange={(e) => setFormData({ ...formData, price3: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Комнат *
              </label>
              <input
                type="number"
                required
                value={formData.room}
                onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Спальных мест *
              </label>
              <input
                type="number"
                required
                value={formData.sleepPlaces}
                onChange={(e) => setFormData({ ...formData, sleepPlaces: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Метро *
              </label>
              <input
                type="text"
                required
                value={formData.metro}
                onChange={(e) => setFormData({ ...formData, metro: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Площадь (м²) *
              </label>
              <input
                type="number"
                required
                value={formData.mainArea}
                onChange={(e) => setFormData({ ...formData, mainArea: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Жилая площадь (м²) *
              </label>
              <input
                type="number"
                required
                value={formData.livingSpace}
                onChange={(e) => setFormData({ ...formData, livingSpace: e.target.value })}
                className="w-full px-3 py-2 border border--300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Площадь кухни (м²) *
              </label>
              <input
                type="number"
                required
                value={formData.kitchenSpace}
                onChange={(e) => setFormData({ ...formData, kitchenSpace: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Время заселения
              </label>
              <input
                type="text"
                value={formData.settlementTime}
                onChange={(e) => setFormData({ ...formData, settlementTime: e.target.value })}
                placeholder="14:00"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-black mb-1">
                Особенности (через запятую)
              </label>
              <input
                type="text"
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                placeholder="WiFi, Парковка, Кондиционер"
                className="w-full px-3 py-2 border border-black-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-black mb-1">
                Ориентиры (через запятую)
              </label>
              <input
                type="text"
                value={formData.landmarks}
                onChange={(e) => setFormData({ ...formData, landmarks: e.target.value })}
                placeholder="Парк, Магазин, ТЦ"
                className="w-full px-3 py-2 border border-black-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-black mb-1">
                Условия заселения (true/false через запятую)
              </label>
              <input
                type="text"
                value={formData.settlementCond}
                onChange={(e) => setFormData({ ...formData, settlementCond: e.target.value })}
                placeholder="true, false"
                className="w-full px-3 py-2 border border-black-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-black mb-1">
                Фотографии (URL через запятую)
              </label>
              <input
                type="text"
                value={formData.images}
                onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                placeholder="img1.jpg, img2.jpg"
                className="w-full px-3 py-2 border border-black-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-black mb-1">
                Описание *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-black-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
            >
              Добавить квартиру
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md transition-colors"
            >
              Отмена
            </button>
          </div>
        </form>
      )}
    </div>
  );
} 