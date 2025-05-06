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

export default function AddBlockPage() {
  // const { slug: slugParam } = useParams();

  const [form, setForm] = React.useState({} as any);
  // const [blocks, setBlocks] = React.useState([]);
  const [image, setImage] = React.useState<File | null>(null);
  const [isImage, setIsImage] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    await mutateAsync({ data: form });
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

  // const locales = page?.map((page) => page.locale);

  React.useEffect(() => {
    if (locales) {
      const globalPage = {
        name: "",
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
    mutationFn: async ({ data }: { data: any }) => {
      const res = await addBlock({ data });
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
            }));
          }}
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
        </div>
        {isImage && (
          <>
            <Input
              type="file"
              name="image"
              label="Image"
              onChange={(e) =>
                setForm((prev: any) => ({
                  ...prev,
                  image: e.target.files?.[0],
                }))
              }
            />
            <Tabs>
              {locales?.map((locale) => (
                <Tab key={locale.slug} label={locale.slug}>
                  <Input
                    type="text"
                    name="imageAlt"
                    label="Image Alt"
                    onChange={(e) =>
                      setForm((prev: any) => ({
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
                    onChange={(e) =>
                      setForm((prev: any) => ({
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
          </>
        )}
        <Button onClick={handleSubmit}>Save</Button>
      </div>
    </div>
  );
}
