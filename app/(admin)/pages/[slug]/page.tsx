"use client";
import React from "react";
import { useParams } from "next/navigation";
import { Input } from "@/components/jump-ui";
import { useQuery } from "@tanstack/react-query";
import { getPage } from "@/services/pages/getPage";

export default function PagePage() {
  const { slug: slugParam } = useParams();

  const [form, setForm] = React.useState([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };

  const { data: page } = useQuery({
    queryKey: ["page", slugParam],
    queryFn: () => getPage(slugParam as string),
  });

  React.useEffect(() => {
    if (page) {
      const data = page.map((page) => ({ name: page.name, slug: page.slug }));
      setForm(data as any);
    }
  }, [page]);

  return (
    <div>
      {slugParam}
      {page?.map((page) => (
        <div key={page.id}>
          <h1>{page.name}</h1>
          <Input
            type="text"
            name="name"
            id="name"
            label="Name"
            value={page.name}
          />
          <Input
            type="text"
            name="slug"
            id="slug"
            label="Slug"
            value={page.slug}
          />
        </div>
      ))}
    </div>
  );
}
