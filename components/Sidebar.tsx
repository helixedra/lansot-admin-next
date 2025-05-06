"use client";
import React, { useState } from "react";
import Link from "next/link";
import { RiHomeFill, RiImageFill, RiFileListFill } from "react-icons/ri";

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
      label: "Images",
      icon: <RiImageFill />,
      href: "/images",
    },
  ];

  return (
    <div className="h-full bg-zinc-400/20">
      <ul className="flex flex-col gap-4 p-4 h-full min-h-screen">
        {items.map((item) => (
          <li key={item.label}>
            <Link href={item.href} className="hover:opacity-70 transition">
              <div className="flex items-center gap-2 rounded-lg p-2 hover:bg-zinc-400/20 transition">
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
