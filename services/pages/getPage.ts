"use server";
import prisma from "@/lib/prisma";

export async function getPage(slug: string) {
  const res = await prisma.page.findMany({
    where: {
      slug: slug,
    },
    include: {
      meta: true,
      blocks: true,
      galleries: true,
    },
  });
  return res;
}
