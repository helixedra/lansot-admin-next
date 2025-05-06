"use server";
import prisma from "@/lib/prisma";

export async function getBlock(id: string) {
  const res = await prisma.block.findMany({
    where: {
      id: id,
    },
  });
  return res;
}
