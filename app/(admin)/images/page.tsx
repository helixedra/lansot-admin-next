"use client";
import React from "react";
import { Button } from "@/components/jump-ui";
import UploadForm from "@/components/shared/UploadForm";
import { useQuery } from "@tanstack/react-query";
import { getImages } from "@/services/images/getImages";
import { Dialog } from "@/components/jump-ui";
import Image from "next/image";

export default function ImagesPage() {
  const [open, setOpen] = React.useState(false);
  const { data: images } = useQuery({
    queryKey: ["images"],
    queryFn: getImages,
  });

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={() => setOpen(true)}>Upload Image</Button>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-2">Images</h2>
        <ul className="flex flex-wrap gap-4">
          {images?.map((image: any) => (
            <ImageItem key={image.id} image={image} />
          ))}
        </ul>
      </div>
      <Dialog isOpen={open} onClose={() => setOpen(false)}>
        <Dialog.Header>Upload Image</Dialog.Header>
        <Dialog.Content>
          <UploadForm open={open} setOpen={setOpen} />
        </Dialog.Content>
      </Dialog>
    </div>
  );
}

const ImageItem = ({ image }: { image: any }) => {
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
