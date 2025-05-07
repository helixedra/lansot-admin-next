"use client";
import React from "react";
import { useParams } from "next/navigation";
import { Button, Checkbox, Input } from "@/components/jump-ui";
import { useQuery } from "@tanstack/react-query";
import { getPage } from "@/services/pages/getPage";
import { Tabs, Tab } from "@/components/shared/Tabs";
import Link from "next/link";
import { Textarea } from "@/components/jump-ui/components/Textarea";
import { addBlock } from "@/services/blocks/addBlock";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getLocales } from "@/services/getLocales";
import Gallery from "@/components/Gallery";
import Image from "next/image";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useRouter } from "next/navigation";

export default function AddBlockPage() {
  // const { slug: slugParam } = useParams();

  const [form, setForm] = React.useState({} as any);
  // const [blocks, setBlocks] = React.useState([]);
  const [image, setImage] = React.useState<File | null>(null);
  const [isImage, setIsImage] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<{
    id: string;
    path: string;
  } | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    await mutateAsync({ data: form, image: selectedImage?.id });
    router.push("/blocks");
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImage(null);
  };

  const queryClient = useQueryClient();

  // const { data: page, isLoading } = useQuery({
  //   queryKey: ["page", slugParam],
  //   queryFn: () => getPage(slugParam as string),
  // });

  const { data: locales, isLoading } = useQuery({
    queryKey: ["locales"],
    queryFn: getLocales,
  });

  const slugBuilder = (name: string) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, "-");
    return slug;
  };

  // const locales = page?.map((page) => page.locale);

  React.useEffect(() => {
    if (locales) {
      const globalPage = {
        name: "",
        slug: "",
      };
      const localePage = locales.reverse().reduce(
        (acc, block) => ({
          ...acc,
          [block.slug!]: {
            locale: block.slug,
            title: "",
            content: "",
          },
        }),
        {}
      );
      setForm({ ...globalPage, locales: { ...localePage } });
    }
  }, [locales]);

  console.log("form", form);

  const { mutateAsync } = useMutation({
    mutationFn: async ({ data, image }: { data: any; image?: string }) => {
      const res = await addBlock({ data, image });
      return res;
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["blocks"] });
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log("selectedImage", selectedImage);
  //   return;
  return (
    <div>
      <div>
        <Link href="/blocks">Back</Link>
      </div>

      <div className="flex flex-col gap-8 max-w-md mx-auto">
        <Input
          type="text"
          name="name"
          label="Name"
          value={form?.name || ""}
          onChange={(e) => {
            setForm((prev: any) => ({
              ...prev,
              name: e.target.value,
              slug: slugBuilder(e.target.value),
            }));
          }}
        />
        <Input
          type="text"
          name="slug"
          label="Slug"
          readOnly
          className="text-zinc-500"
          value={form?.slug || ""}
        />
        <Tabs>
          {locales?.map((locale) => (
            <Tab key={locale.slug} label={locale.slug}>
              <Input
                type="text"
                name="title"
                label="Title"
                value={form?.locales?.[locale.slug]!.title || ""}
                onChange={(e) => {
                  setForm((prev: any) => ({
                    ...prev,
                    locales: {
                      ...prev.locales,
                      [locale.slug!]: {
                        ...prev.locales[locale.slug!],
                        title: e.target.value,
                      },
                    },
                  }));
                }}
              />
            </Tab>
          ))}
        </Tabs>
        <Tabs>
          {locales?.map((locale) => (
            <Tab key={locale.slug} label={locale.slug}>
              <Textarea
                name="content"
                label="Content"
                rows={10}
                value={form?.locales?.[locale.slug]!.content || ""}
                onChange={(e) => {
                  setForm((prev: any) => ({
                    ...prev,
                    locales: {
                      ...prev.locales,
                      [locale.slug!]: {
                        ...prev.locales[locale.slug!],
                        content: e.target.value,
                      },
                    },
                  }));
                }}
              />
            </Tab>
          ))}
        </Tabs>
        <div className="flex items-center gap-2">
          <Checkbox
            label="Image"
            checked={isImage}
            onChange={() => setIsImage((prev) => !prev)}
          />
          <div>Image</div>
          {selectedImage?.id && (
            <div className="flex items-center gap-2">
              <Image src={selectedImage.path} width={100} height={100} alt="" />
              <Button onClick={removeImage}>
                <RiDeleteBin2Line />
              </Button>
            </div>
          )}
        </div>
        {isImage && (
          <>
            <Gallery
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
          </>
        )}
        <Button onClick={handleSubmit}>Save</Button>
      </div>
    </div>
  );
}
