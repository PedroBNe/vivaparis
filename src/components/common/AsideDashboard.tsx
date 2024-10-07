// components/common/AsideDashboard.tsx
"use client";

import { ChevronRight, Home, BarChart2, Users, Settings, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

interface AsideDashboardProps {
  expanded: boolean;
  setExpanded: (value: boolean) => void;
}

export default function AsideDashboard({ expanded, setExpanded }: AsideDashboardProps) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Home", href: "/dashboard/home", icon: Home },
    { name: "Blog", href: "/dashboard/blogs", icon: BarChart2 },
    { name: "Categoria", href: "/dashboard/blogs/categorias", icon: Settings },
    { name: "Midia", href: "/dashboard/posts", icon: Users },
    { name: "Aulas", href: "/dashboard/aulas", icon: Settings },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-screen bg-gray-800 text-white transition-all duration-300 ease-in-out ${expanded ? "w-64" : "w-16"
        }`}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center justify-between px-4">
          {expanded && <span className="text-xl font-bold">Dashboard</span>}
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10"
            onClick={() => setExpanded(!expanded)}
            aria-label={expanded ? "Recolher menu" : "Expandir menu"}
          >
            {expanded ? <ChevronRight className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
        <div className="flex-grow overflow-y-auto">
          <nav className="space-y-2 p-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-700 ${pathname === item.href ? "bg-gray-900 text-white" : "text-gray-300"
                  }`}
              >
                <item.icon className={`h-5 w-5 ${expanded ? "mr-3" : "mx-auto"}`} />
                {expanded && <span>{item.name}</span>}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}
