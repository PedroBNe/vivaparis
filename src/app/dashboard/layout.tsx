"use client";
// app/dashboard/layout.tsx
import AsideDashboard from '@/components/common/AsideDashboard';
import { ReactNode, useState } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {

  const [expanded, setExpanded] = useState(true);

  return (
    <div className="flex">
      <AsideDashboard expanded={expanded} setExpanded={setExpanded} />
      <main className={`z-30 transition-all absolute top-0 h-screen bg-[#E6E4D5] left-0 duration-300 ease-in-out ${expanded ? 'ml-64 w-[calc(100%-16rem)]' : 'ml-16 w-[calc(100%-4rem)]'}`}>
        {children}
      </main>
    </div>
  );
}
