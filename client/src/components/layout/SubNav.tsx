"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { navData } from "@/constants/navData";

const SubNav = () => {
  const pathname = usePathname();

  // Find the active parent nav item
  const activeNav = navData.find((item) => pathname.startsWith(item.href));

  return (
    <nav className="p-4 bg-gray-100 border-b">
      <ul className="flex space-x-4">
        {activeNav?.nav.map((subItem) => (
          <li
            key={subItem.href}
            className={
              pathname === subItem.href
                ? "font-bold text-blue-600"
                : "text-gray-700"
            }
          >
            <a href={subItem.href}>{subItem.name}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SubNav;
