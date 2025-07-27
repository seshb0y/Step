/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `phoneNumber` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stars` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telegram` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `viber` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whatsApp` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MODERATOR', 'USER');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "announcementCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "registerDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER',
ADD COLUMN     "stars" TEXT NOT NULL,
ADD COLUMN     "telegram" TEXT NOT NULL,
ADD COLUMN     "viber" TEXT NOT NULL,
ADD COLUMN     "whatsApp" TEXT NOT NULL;

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "Apartment" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "price1" INTEGER NOT NULL,
    "price2" INTEGER NOT NULL,
    "price3" INTEGER NOT NULL,
    "sleepPlaces" INTEGER NOT NULL,
    "room" INTEGER NOT NULL,
    "metro" TEXT NOT NULL,
    "features" TEXT[],
    "userId" INTEGER,
    "settlementTime" TEXT NOT NULL,
    "settlementCond" BOOLEAN[],
    "description" TEXT NOT NULL,
    "images" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "isPremium" BOOLEAN NOT NULL DEFAULT false,
    "mainArea" INTEGER NOT NULL,
    "livingSpace" INTEGER NOT NULL,
    "kitchenSpace" INTEGER NOT NULL,
    "landmarks" TEXT[],

    CONSTRAINT "Apartment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Apartment" ADD CONSTRAINT "Apartment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
