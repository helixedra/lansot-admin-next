"use server";
import prisma from "@/lib/prisma";

export async function addPage({
  data,
}: {
  data: { name: string; slug: string };
}) {
  const { name, slug } = data;

  console.log(name, slug);

  try {
    const locales = await prisma.locale.findMany();

    console.log(locales);

    const results = await Promise.all(
      locales.map(async (locale) => {
        const res = await prisma.page.create({
          data: {
            name,
            slug,
            locale: locale.slug,
            meta: {
              create: {
                title: name,
                description: name,
              },
            },
          },
        });
        return res;
      })
    );

    return results;
  } catch (error) {
    console.error("Error creating pages:", (error as Error).message);
    throw new Error("Failed to create pages");
  }
}
