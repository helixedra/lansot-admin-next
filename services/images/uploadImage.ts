"use server";

import prisma from "@/lib/prisma";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";

// add image to database
export async function uploadImage(file: File, meta?: any) {
  try {
    // check if meta exists
    if (!meta) {
      return { success: false, message: "Meta not found" };
    }

    // check if locales exists
    if (!meta?.locales) {
      return { success: false, message: "Locales not found" };
    }

    // prepare image meta
    const locales = Object.values(meta?.locales).map((locale: any) => {
      return {
        locale: locale.locale,
        imageTitle: locale.imageTitle,
        imageAlt: locale.imageAlt,
      };
    });

    // create image meta
    const imageMeta = await Promise.all(
      locales.map(async (locale: any) => {
        const imageMeta = await prisma.imageMeta.create({
          data: {
            title: locale.imageTitle,
            alt: locale.imageAlt,
            locale: locale.locale,
          },
        });
        return imageMeta;
      })
    );

    // check if image meta created
    if (!imageMeta) {
      return { success: false, message: "Something went wrong" };
    }

    // upload image
    const imageUpload = await upload(file);

    // check if image uploaded
    if (!imageUpload.success) {
      return imageUpload;
    }

    // create image
    const image = await prisma.image.create({
      data: {
        image: imageUpload.path!,
        meta: {
          connect: {
            id: imageMeta[0].id,
          },
        },
      },
    });

    // check if image created
    if (!image) {
      return { success: false, message: "Something went wrong" };
    }

    return { success: true, image };
  } catch (error) {
    return { success: false, message: "Something went wrong" };
  }
}

// image upload function
export async function upload(file: File) {
  if (!file || typeof file === "string") {
    return { success: false, message: "File not found" };
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), "public", "uploads", "images");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const ext = path.extname(file.name);
  const fileName = `${Date.now()}-${randomUUID()}${ext}`;
  const filePath = path.join(uploadDir, fileName);

  fs.writeFileSync(filePath, buffer);

  return {
    success: true,
    path: `/uploads/images/${fileName}`,
  };
}
