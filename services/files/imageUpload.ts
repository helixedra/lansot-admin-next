"use server";

import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";

export async function uploadImage(file: File) {
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
