import { cn } from "@/lib/utils";
import { LayoutDashboard, Star, Trash2, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const dasboardLinks = [
  {
    id: 0,
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: 1,
    name: "Groups",
    href: "/dashboard/groups",
    icon: Users,
  },
  {
    id: 2,
    name: "Favorites",
    href: "/dashboard/starred",
    icon: Star,
  },
  {
    id: 3,
    name: "Trash",
    href: "/dashboard/trash",
    icon: Trash2,
  },
];

export function DashboardLinks() {
  const location = useLocation();
  return (
    <>
      {dasboardLinks.map((link) => (
        <Link
          key={link.id}
          to={link.href}
          className={cn(
            location.pathname === link.href
              ? "text-white bg-primary/80 "
              : "text-muted-foreground hover:text-slate-900 hover:bg-slate-100",
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-slate-900"
          )}
        >
          <link.icon className="size-4" />
          {link.name}
        </Link>
      ))}
    </>
  );
}
