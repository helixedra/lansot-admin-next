"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  RiHomeFill,
  RiImageFill,
  RiFileListFill,
  RiTextBlock,
  RiShoppingCartFill,
} from "react-icons/ri";

export default function Sidebar() {
  const [isLabelVisible, setIsLabelVisible] = useState(false);
  const items = [
    {
      label: "Home",
      icon: <RiHomeFill />,
      href: "/",
    },
    {
      label: "Pages",
      icon: <RiFileListFill />,
      href: "/pages",
    },
    {
      label: "Blocks",
      icon: <RiTextBlock />,
      href: "/blocks",
    },
    {
      label: "Products",
      icon: <RiShoppingCartFill />,
      href: "/products",
    },
    {
      label: "Images",
      icon: <RiImageFill />,
      href: "/images",
    },
  ];

  return (
    <div className="h-full bg-zinc-400/20 fixed">
      <ul className="flex flex-col gap-4 py-4 px-2 h-full min-h-screen">
        {items.map((item) => (
          <li key={item.label}>
            <Link href={item.href} className="hover:opacity-70 transition">
              <div className="flex items-center gap-2 rounded-lg p-2 hover:bg-zinc-400/20 transition text-[24px]">
                {item.icon}
                {isLabelVisible && (
                  <span className="text-sm">{item.label}</span>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
