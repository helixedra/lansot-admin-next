"use client";
import React from "react";
import { Input, Button } from "@/components/jump-ui";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addBlock } from "@/services/blocks/addBlock";
import { getBlocks } from "@/services/blocks/getBlocks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RiFileTextFill } from "react-icons/ri";

export default function BlocksPage() {
  // const [name, setName] = React.useState("");
  // const [slug, setSlug] = React.useState("");

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   await mutateAsync({ data: { name, slug } });
  //   setName("");
  //   setSlug("");
  // };

  const router = useRouter();

  const { data: blocks } = useQuery({
    queryKey: ["blocks"],
    queryFn: getBlocks,
  });

  // const queryClient = useQueryClient();

  // const { mutateAsync } = useMutation({
  //   mutationFn: async ({ data }: { data: { name: string; slug: string } }) => {
  //     const res = await addBlock({ data });
  //     return res;
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries({ queryKey: ["pages"] });
  //   },
  // });

  // let collectedPages: any = [];
  // pages?.forEach((page) => {
  //   const found = collectedPages.find((p: any) => p.slug === page.slug);
  //   if (!found) {
  //     collectedPages.push({
  //       slug: page.slug,
  //       name: page.name,
  //       locales: [page.locale],
  //     });
  //   } else if (!found.locales.includes(page.locale)) {
  //     found.locales.push(page.locale);
  //   }
  // });

  // console.log(collectedPages);

  return (
    <div>
      <Button onClick={() => router.push("/blocks/new")}>New Block</Button>
      {/* <div className="flex flex-col gap-2 max-w-md mx-auto">
        <Input
          type="text"
          name="name"
          id="name"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="text"
          name="slug"
          id="slug"
          label="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
        <Button className="mt-8" onClick={handleSubmit}>
          Create Page
        </Button>
      </div> */}

      <div className="mt-8">
        <h2 className="text-2xl font-bold">Blocks</h2>
        <ul>
          {blocks?.map((block: any, index: number) => (
            <Link
              href={`/blocks/${block.id}`}
              key={block.name + index}
              className="hover:opacity-80 transition-opacity"
            >
              <li className="flex items-center gap-2">
                <RiFileTextFill />
                {block.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
