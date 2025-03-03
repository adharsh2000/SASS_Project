import { AppSidebar } from "@/components/layout/Sidebar";
import SubNav from "@/components/layout/SubNav";
import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <AppSidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between bg-gray-100 px-4 py-3 border-b">
          <div className="flex items-center space-x-4">
            <SidebarTrigger />
            <SubNav />
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <h1 className="text-2xl font-semibold">
            Dashboard Layout - Nav Header
          </h1>
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
