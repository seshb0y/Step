import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Создание пользователей
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      name: 'Иван Иванов',
      role: 'USER',
      telegram: '@ivanov',
      whatsApp: '+79990001111',
      viber: '+79990001111',
      phoneNumber: '+79990001111',
      stars: '5',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'moderator@example.com',
      name: 'Мария Модератор',
      role: 'MODERATOR',
      telegram: '@moderator',
      whatsApp: '+79990002222',
      viber: '+79990002222',
      phoneNumber: '+79990002222',
      stars: '4',
    },
  });

  // Создание квартир
  await prisma.apartment.create({
    data: {
      address: 'ул. Ленина, 1',
      price1: 2000,
      price2: 2500,
      price3: 3000,
      sleepPlaces: 2,
      room: 1,
      metro: 'Площадь Ленина',
      features: ['WiFi', 'Парковка'],
      userId: user1.id,
      settlementTime: '14:00',
      settlementCond: [true, false],
      description: 'Уютная квартира в центре города',
      images: ['img1.jpg', 'img2.jpg'],
      mainArea: 40,
      livingSpace: 20,
      kitchenSpace: 10,
      landmarks: ['Парк', 'Магазин'],
    },
  });

  await prisma.apartment.create({
    data: {
      address: 'пр. Мира, 10',
      price1: 3000,
      price2: 3500,
      price3: 4000,
      sleepPlaces: 4,
      room: 2,
      metro: 'Маяковская',
      features: ['Балкон', 'Кондиционер'],
      userId: user2.id,
      settlementTime: '12:00',
      settlementCond: [true, true],
      description: 'Просторная квартира рядом с метро',
      images: ['img3.jpg', 'img4.jpg'],
      mainArea: 60,
      livingSpace: 35,
      kitchenSpace: 15,
      landmarks: ['ТЦ', 'Кафе'],
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
