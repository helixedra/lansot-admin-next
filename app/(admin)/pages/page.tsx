"use client";
import React from "react";
import { Input, Button } from "@/components/jump-ui";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addPage } from "@/services/pages/addPage";
import { getPages } from "@/services/pages/getPages";
import Link from "next/link";

export default function PagesPage() {
  const [name, setName] = React.useState("");
  const [slug, setSlug] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await mutateAsync({ data: { name, slug } });
    setName("");
    setSlug("");
  };

  const { data: pages } = useQuery({
    queryKey: ["pages"],
    queryFn: getPages,
  });

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async ({ data }: { data: { name: string; slug: string } }) => {
      const res = await addPage({ data });
      return res;
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
    },
  });

  return (
    <div>
      <h1>Pages</h1>
      <div className="flex flex-col gap-2 max-w-md mx-auto">
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
      </div>

      <div className="mt-8">
        <h2>Pages</h2>
        <ul>
          {pages?.map((page) => (
            <Link href={`/pages/${page.slug}`} key={page.id}>
              <li>{page.name}</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
