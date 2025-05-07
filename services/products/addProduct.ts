"use server";
import prisma from "@/lib/prisma";

export async function addProduct({
  data,
  image,
}: {
  data: any;
  image?: string;
}) {
  const { name, slug, locales } = data;

  const localeBlocks = Object.values(locales).map((locale: any) => {
    return {
      locale: locale.locale,
      title: locale.title,
      content: locale.content,
    };
  });

  try {
    const results = await Promise.all(
      localeBlocks.map(async (locale: any) => {
        const res = await prisma.product.create({
          data: {
            name,
            locale: locale.locale,
            title: locale.title,
            slug,
            content: locale.content,
            image: image
              ? {
                  connect: {
                    id: image,
                  },
                }
              : undefined,
          },
        });
        return res;
      })
    );
    return results;
  } catch (error) {
    console.error("Error creating blocks:", (error as Error).message);
    throw new Error("Failed to create blocks");
  }
}
