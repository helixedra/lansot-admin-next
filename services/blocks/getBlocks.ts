"use server";
import prisma from "@/lib/prisma";

export async function getBlocks() {
  const res = await prisma.block.findMany({});
  return res;
}
