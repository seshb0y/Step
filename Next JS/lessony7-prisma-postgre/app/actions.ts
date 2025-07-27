"use server";

import prisma from "../lib/prisma";

export async function addApartment(formData: FormData) {
  try {
    const address = formData.get("address") as string;
    const price1 = parseInt(formData.get("price1") as string);
    const price2 = parseInt(formData.get("price2") as string);
    const price3 = parseInt(formData.get("price3") as string);
    const sleepPlaces = parseInt(formData.get("sleepPlaces") as string);
    const room = parseInt(formData.get("room") as string);
    const metro = formData.get("metro") as string;
    const features = formData.get("features") as string;
    const userId = formData.get("userId") as string;
    const settlementTime = formData.get("settlementTime") as string;
    const settlementCond = formData.get("settlementCond") as string;
    const description = formData.get("description") as string;
    const images = formData.get("images") as string;
    const mainArea = parseInt(formData.get("mainArea") as string);
    const livingSpace = parseInt(formData.get("livingSpace") as string);
    const kitchenSpace = parseInt(formData.get("kitchenSpace") as string);
    const landmarks = formData.get("landmarks") as string;

    const apartment = await prisma.apartment.create({
      data: {
        address,
        price1,
        price2,
        price3,
        sleepPlaces,
        room,
        metro,
        features: features ? features.split(",").map(item => item.trim()) : [],
        userId: userId ? parseInt(userId) : null,
        settlementTime: settlementTime || "",
        settlementCond: settlementCond ? settlementCond.split(",").map(item => item.trim() === "true") : [],
        description,
        images: images ? images.split(",").map(item => item.trim()) : [],
        mainArea,
        livingSpace,
        kitchenSpace,
        landmarks: landmarks ? landmarks.split(",").map(item => item.trim()) : [],
      },
    });

    return { success: true, apartment };
  } catch (error) {
    console.error("Error adding apartment:", error);
    return { success: false, error: "Failed to add apartment" };
  }
} 