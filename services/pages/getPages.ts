"use server";
import prisma from "@/lib/prisma";

export async function getPages() {
  const res = await prisma.page.findMany({
    include: {
      meta: true,
    },
  });
  return res;
}
