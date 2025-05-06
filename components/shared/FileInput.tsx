"use client";
import { useState, useRef, ChangeEvent } from "react";
import { RiDeleteBinLine, RiImageFill } from "react-icons/ri";

type ImageUploadProps = {
  onFileSelect?: (file: File) => void;
};

export default function FileInput({ onFileSelect }: ImageUploadProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);

      if (onFileSelect) {
        onFileSelect(file);
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);

      if (onFileSelect) {
        onFileSelect(file);
      }
    }
  };

  const resetImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full mx-auto">
      {selectedImage && previewUrl ? (
        <div className="relative rounded-lg overflow-hidden bg-zinc-500/20">
          <img
            src={previewUrl}
            alt={selectedImage.name}
            className="w-full h-64 object-contain"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black/90 text-white p-2">
            <p className="text-sm font-medium truncate">{selectedImage.name}</p>
            <p className="text-xs opacity-60 mt-1">
              {(selectedImage.size / 1024).toFixed(2)} KB
            </p>
          </div>
          <button
            onClick={resetImage}
            className="absolute top-2 right-2 bg-black/60 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
            title="Видалити зображення"
          >
            <RiDeleteBinLine />
          </button>
        </div>
      ) : (
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200 
          ${
            isDragging
              ? "border-blue-500 bg-blue-500/20"
              : "border-zinc-300/50 hover:border-blue-400 bg-blue-500/20 hover:bg-blue-500/40"
          }`}
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="flex flex-col items-center">
            {/* Remix Icon for image upload */}
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-black/10 mb-4">
              <RiImageFill />
            </div>
            <p className="text-sm font-medium text-zinc-900 dark:text-white">
              Перетягніть зображення сюди або клікніть для вибору
            </p>
            <p className="text-xs text-zinc-500 mt-1 dark:text-zinc-400">
              Підтримуються формати JPG, PNG, SVG, GIF
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
