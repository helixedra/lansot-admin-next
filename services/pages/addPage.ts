"use server";
import prisma from "@/lib/prisma";

export async function addPage({ data }: { data: any }) {
  // const { name, slug, locale } = data;
  const { name, slug, locales } = data;

  const localePages = Object.values(locales).map((locale: any) => {
    return {
      locale: locale.locale,
      meta: {
        title: locale.meta.title,
        description: locale.meta.description,
      },
    };
  });

  try {
    // const locales = await prisma.locale.findMany();
    const results = await Promise.all(
      localePages.map(async (locale: any) => {
        const res = await prisma.page.create({
          data: {
            name,
            slug,
            locale: locale.locale,
            meta: {
              create: {
                title: locale.meta.title,
                description: locale.meta.description,
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
