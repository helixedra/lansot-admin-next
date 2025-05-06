import React from "react";
import Sidebar from "@/components/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full min-h-screen">
      <Sidebar />
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
}
