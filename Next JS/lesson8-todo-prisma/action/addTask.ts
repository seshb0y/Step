"use server";

import prisma from "@/lib/prisma";
import { Priority } from "@prisma/client";

export async function addTask(formData: FormData) {
    const title = formData.get("title") as string;
    const priority = formData.get("priority") as string;
    await prisma.task.create({
        data:{
            title,
            priority: priority as Priority,
        }
    })
}