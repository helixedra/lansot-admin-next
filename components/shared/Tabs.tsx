"use client";
import React, { useState } from "react";

interface TabProps {
  label: string;
  children: React.ReactNode;
}
interface TabsProps {
  children: React.ReactNode;
}

export function Tabs({ children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div>
      <div className="flex">
        {React.Children.map(children, (child, index) => {
          // Ensure child is a valid React element
          if (!React.isValidElement<TabProps>(child)) return null;

          return (
            <button
              key={index}
              onClick={() => handleTabChange(index)}
              className={`px-2 rounded ${
                activeTab === index ? "bg-zinc-500 text-white" : "text-gray-500"
              }`}
            >
              {child.props.label || `Tab ${index + 1}`}
            </button>
          );
        })}
      </div>
      <div>
        {React.Children.map(children, (child, index) => {
          // Only render the active tab's content
          if (!React.isValidElement<TabProps>(child) || index !== activeTab)
            return null;
          return <div key={index}>{child.props.children}</div>;
        })}
      </div>
    </div>
  );
}

export function Tab({ children, label }: TabProps) {
  return <>{children}</>;
}
