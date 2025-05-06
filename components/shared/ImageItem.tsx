"use client";
import Image from "next/image";

export const ImageItem = ({ image }: { image: any }) => {
  return (
    <li
      key={image.id}
      className="flex gap-2 w-24 h-24 bg-zinc-500/20 rounded-lg hover:opacity-80 transition cursor-pointer overflow-hidden"
    >
      <Image
        src={image.image}
        width={100}
        height={100}
        alt=""
        className="w-full h-full object-contain"
      />
    </li>
  );
};
