import React from "react";
import { Dialog } from "./jump-ui";
import { Button } from "./jump-ui/components/Button";
import { useQuery } from "@tanstack/react-query";
import { getImages } from "@/services/images/getImages";
import { ImageItem } from "./shared/ImageItem";
import { Checkbox } from "./jump-ui/components/Checkbox";

export default function Gallery({
  selectedImage,
  setSelectedImage,
}: {
  selectedImage: { id: string; path: string } | null;
  setSelectedImage: (image: { id: string; path: string } | null) => void;
}) {
  const [open, setOpen] = React.useState(false);

  const { data: images } = useQuery({
    queryKey: ["images"],
    queryFn: getImages,
  });

  return (
    <>
      <Dialog isOpen={open} onClose={() => setOpen(false)}>
        <Dialog.Content>
          <Dialog.Header>Gallery</Dialog.Header>
          <ul className="flex flex-wrap gap-4">
            {images?.map((image: any) => (
              <div
                key={image.id}
                className="flex items-center gap-2 relative w-fit"
              >
                <Checkbox
                  checked={selectedImage?.id === image.id}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    e.stopPropagation();
                    setSelectedImage(
                      e.target.checked
                        ? { id: image.id, path: image.image }
                        : null
                    );
                  }}
                  className="absolute top-2 right-2 z-10 bg-zinc-200/20"
                />
                <ImageItem image={image} />
              </div>
            ))}
          </ul>
          <Button onClick={() => setOpen(false)}>Select</Button>
        </Dialog.Content>
      </Dialog>
      <Button outline onClick={() => setOpen(true)}>
        Open Gallery
      </Button>
    </>
  );
}
