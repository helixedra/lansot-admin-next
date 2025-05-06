"use server";
import prisma from "@/lib/prisma";

export async function getLocales() {
  const locales = await prisma.locale.findMany();
  return locales;
}
