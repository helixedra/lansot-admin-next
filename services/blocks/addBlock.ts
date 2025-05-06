"use server";
import prisma from "@/lib/prisma";
import { uploadImage } from "@/services/files/imageUpload";

export async function addBlock({ data }: { data: any }) {
  // const { name, slug, locale } = data;
  console.log(data);
  const { name, locales, image, pageId } = data;

  const localePages = Object.values(locales).map((locale: any) => {
    return {
      locale: locale.locale,
      title: locale.title,
      content: locale.content,
      imageTitle: locale.imageTitle,
      imageAlt: locale.imageAlt,
    };
  });

  try {
    const upload = await uploadImage(image);

    console.log(upload);

    const blockImageMeta = await Promise.all(
      localePages.map(async (locale: any) => {
        const blockImageMeta = await prisma.imageMeta.create({
          data: {
            title: locale.imageTitle,
            alt: locale.imageAlt,
            locale: locale.locale,
          },
        });
        return blockImageMeta;
      })
    );

    const blockImage = await prisma.blockImage.create({
      data: {
        image: upload.path!,
        meta: {
          connect: {
            id: blockImageMeta[0].id,
          },
        },
      },
    });

    const results = await Promise.all(
      localePages.map(async (locale: any) => {
        const res = await prisma.block.create({
          data: {
            name,
            locale: locale.locale,
            title: locale.title,
            content: locale.content,
            images: {
              connect: {
                id: blockImage.id,
              },
            },
            // page: {
            //   connect: {
            //     id: pageId || "",
            //   },
            // },
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
