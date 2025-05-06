"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
import { theme as c } from "./config";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string;
  style?: React.CSSProperties;
  icon?: string | React.ReactNode;
  iconEnd?: string | React.ReactNode;
  name?: string;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  label?: string;
};

export function Textarea({
  className,
  icon,
  iconEnd,
  style,
  name = "textarea",
  placeholder,
  defaultValue,
  value,
  label,
  ...props
}: TextareaProps) {
  const defaultStyles = `bg-transparent px-4 border ${c.border} py-2 ${
    c.rounded
  } focus:outline-none text-sm focus:ring-2 focus:ring-zinc-400 focus:ring-opacity-50 flex items-center ${
    icon && "pl-9"
  } ${iconEnd && "pr-9"} w-full`;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="text-sm text-zinc-500 dark:text-zinc-400"
        >
          {label}
        </label>
      )}

      <span className={twMerge("block relative", className)}>
        {icon && (
          <span className="absolute left-3 top-0 flex items-start h-full pt-2">
            {icon}
          </span>
        )}
        <textarea
          className={twMerge(defaultStyles, className)}
          style={style}
          name={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={value}
          {...props}
        />
        {iconEnd && (
          <span className="absolute right-3 top-0 flex items-start h-full pt-2">
            {iconEnd}
          </span>
        )}
      </span>
    </div>
  );
}
