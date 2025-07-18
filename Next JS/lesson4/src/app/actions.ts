"use server";

import { feedbackSchema } from "./lib/schema";

export async function handleSubmit(formData: FormData) {
  const data = {
    name: formData.get("name"),
    comment: formData.get("comment"),
    rate: formData.get("rate"),
  };
  const result = feedbackSchema.safeParse(data);
  return JSON.stringify(result, null, 2);
}
