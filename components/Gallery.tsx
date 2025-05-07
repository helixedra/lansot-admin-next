import React from "react";
import { Dialog } from "./jump-ui";
import { Button } from "./jump-ui/components/Button";
import { useQuery } from "@tanstack/react-query";
import { getImages } from "@/services/images/getImages";
import { ImageItem } from "./shared/ImageItem";
import { Checkbox } from "./jump-ui/components/Checkbox";

type InputChange = React.ChangeEvent<HTMLInputElement>;

type ImageType = {
  id: string;
  image: string;
};

export default function Gallery({
  selectedImages,
  setSelectedImages,
  open,
  setOpen,
  multiselect = false,
}: {
  selectedImages: { id: string; path: string }[];
  setSelectedImages: (images: { id: string; path: string }[]) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  multiselect?: boolean;
}) {
  const { data: images } = useQuery<ImageType[]>({
    queryKey: ["images"],
    queryFn: getImages,
  });

  const handleSelect = (checked: boolean, image: ImageType) => {
    if (multiselect) {
      const updated = checked
        ? [...selectedImages, { id: image.id, path: image.image }]
        : selectedImages.filter((img) => img.id !== image.id);
      setSelectedImages(updated);
    } else {
      setSelectedImages(checked ? [{ id: image.id, path: image.image }] : []);
      setOpen(false); // тільки в одиночному виборі закриваємо
    }
  };

  return (
    <Dialog isOpen={open} onClose={() => setOpen(false)}>
      <Dialog.Content>
        <Dialog.Header>Gallery</Dialog.Header>
        <div className="flex flex-wrap gap-4">
          {images?.map((image) => (
            <div
              key={image.id}
              className="flex items-center gap-2 relative w-fit list-none"
            >
              <Checkbox
                checked={selectedImages.some((img) => img.id === image.id)}
                onChange={(e: InputChange) => {
                  e.stopPropagation();
                  handleSelect(e.target.checked, image);
                }}
                className="absolute top-2 right-2 z-10 bg-zinc-200/20"
              />
              <ImageItem image={image} />
            </div>
          ))}
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
