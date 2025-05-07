import { getBlocks } from "@/services/blocks/getBlocks";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const locale = searchParams.get("locale");
  const slug = searchParams.get("slug");

  if (!slug) {
    const res = await prisma.block.findMany({
      include: {
        image: true,
      },
      where: locale
        ? {
            locale: locale,
          }
        : undefined,
    });
    return NextResponse.json(res);
  }

  if (slug) {
    const res = await prisma.block.findMany({
      include: {
        image: true,
      },
      where: {
        AND: [
          {
            slug: slug ? slug : undefined,
          },
          {
            locale: locale ? locale : undefined,
          },
        ],
      },
    });
    return NextResponse.json(res);
  }
}
