"use server";

import prisma from "@/lib/prisma";

export async function getImages() {
  const images = await prisma.image.findMany();
  return images;
}
