"use client";
import React from "react";
import { Input, Button } from "@/components/jump-ui";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addPage } from "@/services/pages/addPage";
import { getPages } from "@/services/pages/getPages";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RiFileTextFill } from "react-icons/ri";

export default function PagesPage() {
  // const [name, setName] = React.useState("");
  // const [slug, setSlug] = React.useState("");

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   await mutateAsync({ data: { name, slug } });
  //   setName("");
  //   setSlug("");
  // };

  const router = useRouter();

  const { data: pages } = useQuery({
    queryKey: ["pages"],
    queryFn: getPages,
  });

  // const queryClient = useQueryClient();

  // const { mutateAsync } = useMutation({
  //   mutationFn: async ({ data }: { data: { name: string; slug: string } }) => {
  //     const res = await addPage({ data });
  //     return res;
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries({ queryKey: ["pages"] });
  //   },
  // });

  let collectedPages: any = [];
  pages?.forEach((page) => {
    const found = collectedPages.find((p: any) => p.slug === page.slug);
    if (!found) {
      collectedPages.push({
        slug: page.slug,
        name: page.name,
        locales: [page.locale],
      });
    } else if (!found.locales.includes(page.locale)) {
      found.locales.push(page.locale);
    }
  });

  return (
    <div>
      <Button onClick={() => router.push("/pages/new")}>New Page</Button>
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
        <h2 className="text-2xl font-bold">Pages</h2>
        <ul>
          {collectedPages?.map((page: any) => (
            <Link
              href={`/pages/${page.slug}`}
              key={page.name}
              className="hover:opacity-80 transition-opacity"
            >
              <li className="flex items-center gap-2">
                <RiFileTextFill />
                {page.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
