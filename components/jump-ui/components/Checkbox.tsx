"use client";
import { RiCheckLine } from "react-icons/ri";
import { twMerge } from "tailwind-merge";
import { theme as c } from "./config";

export function Checkbox({
  className,
  checked,
  label,
  ...props
}: {
  className?: string;
  onChange?: any;
  checked?: boolean;
  label?: string;
  [key: string]: string | boolean | undefined | any;
}) {
  const defaultStyles = `flex items-center justify-center cursor-pointer h-[1.5rem] w-[1.5rem] ${
    c.rounded
  } ${c.border} ${c.focus} ${checked ? c.bg : "bg-transparent"}`;

  return (
    <div className="flex items-center gap-2">
      <label className={twMerge(defaultStyles, className)}>
        <input
          type="checkbox"
          checked={checked}
          className="hidden"
          {...props}
        />
        {checked ? <RiCheckLine className="invert" /> : null}
      </label>
      <span>{label}</span>
    </div>
  );
}
