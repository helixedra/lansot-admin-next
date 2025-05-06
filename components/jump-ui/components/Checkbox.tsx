"use client";
import { useState } from "react";
import { RiCheckLine } from "react-icons/ri";
import { twMerge } from "tailwind-merge";
import { theme as c } from "./config";

export function Checkbox({
  className,
  checked,
  ...props
}: {
  className?: string;
  onChange?: any;
  checked?: boolean;
  [key: string]: string | boolean | undefined | any;
}) {
  const defaultStyles = `flex items-center justify-center cursor-pointer h-[1.5rem] w-[1.5rem] ${
    c.rounded
  } ${c.border} ${c.focus} ${checked ? c.bg : "bg-transparent"}`;

  return (
    <label className={twMerge(defaultStyles, className)}>
      <input type="checkbox" checked={checked} className="hidden" {...props} />
      {checked ? <RiCheckLine className="invert" /> : null}
    </label>
  );
}
