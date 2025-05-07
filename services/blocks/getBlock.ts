"use server";
import prisma from "@/lib/prisma";

export async function getBlock(slug: string) {
  const res = await prisma.block.findMany({
    where: {
      slug: slug,
    },
    include: {
      image: true,
    },
  });
  return res;
}
