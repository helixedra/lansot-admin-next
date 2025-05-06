"use client";

import { useTransition, useState } from "react";
import { uploadImage } from "@/services/images/uploadImage";
import Image from "next/image";
import { Button } from "@/components/jump-ui";
import { useQuery } from "@tanstack/react-query";
import { getLocales } from "@/services/getLocales";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { addBlock } from "@/services/blocks/addBlock";
import { useQueryClient } from "@tanstack/react-query";
import { Tab, Tabs } from "@/components/shared/Tabs";
import { Input } from "@/components/jump-ui/components/Input";
import FileInput from "./FileInput";

export default function UploadForm({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [meta, setMeta] = useState({} as any);

  const queryClient = useQueryClient();

  const { data: locales, isLoading } = useQuery({
    queryKey: ["locales"],
    queryFn: getLocales,
  });

  React.useEffect(() => {
    if (locales) {
      const localeImage = locales.reverse().reduce(
        (acc, meta) => ({
          ...acc,
          [meta.slug!]: {
            locale: meta.slug,
            imageAlt: "",
            imageTitle: "",
          },
        }),
        {}
      );

      setMeta({ locales: { ...localeImage } });
    }
  }, [locales]);

  const handleFileChange = (file: File) => {
    if (!file) return;

    setFile(file);

    const preview = URL.createObjectURL(file);
    setPreviewURL(preview);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!file) return;

    await mutateAsync({ file, meta });
    setFile(null);
    setMeta({} as any);
    setOpen(false);
    // const formData = new FormData();
    // formData.append("file", file);

    // startTransition(async () => {
    //   const res = await uploadImage(file, meta);
    //   if (res.success && res.path) {
    //     setImageURL(res.path);
    //     // відкалібрувати попередній перегляд, якщо треба
    //     URL.revokeObjectURL(previewURL || "");
    //     setPreviewURL(null);
    //     setMeta((prev: any) => ({
    //       ...prev,
    //       file: null,
    //       locales: { ...prev.locales },
    //     }));
    //   }
    // });
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async ({ file, meta }: { file: File; meta: any }) => {
      const res = await uploadImage(file, meta);
      return res;
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log("meta", meta);
  console.log("file", file);
  return (
    <div className="flex flex-col gap-4">
      <FileInput onFileSelect={(file) => handleFileChange(file)} />

      {/* {previewURL && (
        <div>
          <p>Preview:</p>
          <Image src={previewURL} alt="Preview" width={300} height={300} />
        </div>
      )} */}
      <Tabs>
        {locales?.map((locale) => (
          <Tab key={locale.slug} label={locale.slug}>
            <Input
              type="text"
              name="imageAlt"
              label="Image Alt"
              value={meta?.locales?.[locale.slug]!.imageAlt || ""}
              onChange={(e) =>
                setMeta((prev: any) => ({
                  ...prev,
                  locales: {
                    ...prev.locales,
                    [locale.slug!]: {
                      ...prev.locales[locale.slug!],
                      imageAlt: e.target.value,
                    },
                  },
                }))
              }
            />
          </Tab>
        ))}
      </Tabs>
      <Tabs>
        {locales?.map((locale) => (
          <Tab key={locale.slug} label={locale.slug}>
            <Input
              type="text"
              name="imageTitle"
              label="Image Title"
              value={meta?.locales?.[locale.slug]!.imageTitle || ""}
              onChange={(e) =>
                setMeta((prev: any) => ({
                  ...prev,
                  locales: {
                    ...prev.locales,
                    [locale.slug!]: {
                      ...prev.locales[locale.slug!],
                      imageTitle: e.target.value,
                    },
                  },
                }))
              }
            />
          </Tab>
        ))}
      </Tabs>
      <Button disabled={isPending || !file} onClick={(e) => handleSubmit(e)}>
        Upload
      </Button>
    </div>
  );
}
