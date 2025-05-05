"use client";
import React from "react";
import { useParams } from "next/navigation";
import { Button, Input } from "@/components/jump-ui";
import { useQuery } from "@tanstack/react-query";
import { getPage } from "@/services/pages/getPage";
import { Tabs, Tab } from "@/components/shared/Tabs";

export default function PagePage() {
  const { slug: slugParam } = useParams();

  const [form, setForm] = React.useState({} as any);
  const [blocks, setBlocks] = React.useState([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };

  const { data: page, isLoading } = useQuery({
    queryKey: ["page", slugParam],
    queryFn: () => getPage(slugParam as string),
  });

  React.useEffect(() => {
    if (page) {
      const globalPage = {
        name: page[0].name,
        slug: page[0].slug,
      };
      const localePage = page.reduce(
        (acc, page) => ({
          ...acc,
          [page.locale!]: {
            locale: page.locale,
            meta: page.meta,
            blocks: page.blocks,
            galleries: page.galleries,
          },
        }),
        {}
      );
      setForm({ ...globalPage, ...localePage });
    }
  }, [page, slugParam]);

  console.log("form", form);

  if (isLoading || !form.name) {
    return <div>Loading...</div>;
  }

  //   return;
  return (
    <div>
      {slugParam}

      <div className="flex flex-col gap-8 max-w-md mx-auto">
        <h1>{page?.[0].name}</h1>
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
        <Input
          type="text"
          name="slug"
          label="Slug"
          value={form?.slug || ""}
          onChange={(e) => {
            setForm((prev: any) => ({
              ...prev,
              slug: e.target.value,
            }));
          }}
        />
        <Tabs>
          {page?.map((page) => (
            <Tab key={page.id} label={page.locale!}>
              <Input
                type="text"
                name="title"
                label="Meta Title"
                value={form?.[page.locale!]?.meta?.title || ""}
                onChange={(e) => {
                  setForm((prev: any) => ({
                    ...prev,
                    [page.locale!]: {
                      ...prev[page.locale!],
                      meta: {
                        ...prev[page.locale!].meta,
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
          {page?.map((page) => (
            <Tab key={page.id} label={page.locale!}>
              <Input
                type="text"
                name="description"
                label="Meta Description"
                value={form?.[page.locale!]?.meta?.description || ""}
                onChange={(e) => {
                  setForm((prev: any) => ({
                    ...prev,
                    [page.locale!]: {
                      ...prev[page.locale!],
                      meta: {
                        ...prev[page.locale!].meta,
                        description: e.target.value,
                      },
                    },
                  }));
                }}
              />
            </Tab>
          ))}
        </Tabs>
        <Button>Add Block</Button>

        <Tabs>
          {page?.map((page) => (
            <Tab key={page.id} label={page.locale!}>
              <Block />
            </Tab>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

export function Block() {
  return (
    <div>
      <Input
        type="text"
        name="name"
        label="Name"
        value={""}
        onChange={(e) => {}}
      />
      <Input
        type="text"
        name="title"
        label="Title"
        value={""}
        onChange={(e) => {}}
      />
      <Input
        type="text"
        name="content"
        label="Content"
        value={""}
        onChange={(e) => {}}
      />
      <Input type="file" name="image" label="Image" />
      <Input
        type="text"
        name="content"
        label="Content"
        value={""}
        onChange={(e) => {}}
      />
    </div>
  );
}
