"use client";
import React from "react";
import { Button } from "@/components/jump-ui";
import UploadForm from "@/components/shared/UploadForm";
import { useQuery } from "@tanstack/react-query";
import { getImages } from "@/services/images/getImages";
import { Dialog } from "@/components/jump-ui";
import { ImageItem } from "@/components/shared/ImageItem";

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
