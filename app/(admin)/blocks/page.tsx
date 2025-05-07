"use client";
import React from "react";
import { Button } from "@/components/jump-ui";
import { useQuery } from "@tanstack/react-query";
import { getBlocks } from "@/services/blocks/getBlocks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RiFileTextFill } from "react-icons/ri";
import { Block } from "@/generated/prisma";

export default function BlocksPage() {
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["blocks"],
    queryFn: () => getBlocks(),
  });

  let blocks: Block[] = [];

  data?.forEach((block: Block) => {
    if (blocks.find((b: Block) => b.name === block.name)) return;
    blocks.push({
      name: block.name,
      slug: block.slug,
      locale: block.locale,
      id: block.id,
      title: block.title,
      content: block.content,
      createdAt: block.createdAt,
      updatedAt: block.updatedAt,
      pageId: block.pageId,
      imageId: block.imageId,
    });
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Button onClick={() => router.push("/blocks/new")}>New Block</Button>

      <div className="mt-8">
        <h2 className="text-2xl font-bold">Blocks</h2>
        <ul>
          {blocks?.map((block: Block) => (
            <Link
              href={`/blocks/${block.slug}`}
              key={block.id}
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
