
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  Phone, 
  Users, 
  PanelLeft, 
  Settings, 
  LogOut,
  MessagesSquare
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

const NavItem = ({ icon, label, href, active }: NavItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
        active
          ? "bg-app-blue text-white"
          : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className={cn("flex h-screen flex-col border-r bg-white dark:bg-gray-950 dark:border-gray-800", className)}>
      <div className="p-6">
        <h2 className="text-2xl font-bold tracking-tight text-app-blue-dark dark:text-white">
          ConversaFlow
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          AI-Powered Call Analytics
        </p>
      </div>
      <div className="flex-1 space-y-1 px-3">
        <NavItem
          href="/"
          icon={<BarChart3 className="h-5 w-5" />}
          label="Dashboard"
          active={pathname === "/"}
        />
        <NavItem
          href="/calls"
          icon={<Phone className="h-5 w-5" />}
          label="Call Recordings"
          active={pathname === "/calls"}
        />
        <NavItem
          href="/leads"
          icon={<Users className="h-5 w-5" />}
          label="Lead Management"
          active={pathname === "/leads"}
        />
        <NavItem
          href="/deals"
          icon={<PanelLeft className="h-5 w-5" />}
          label="Deal Pipeline"
          active={pathname === "/deals"}
        />
        <NavItem
          href="/ai-assistant"
          icon={<MessagesSquare className="h-5 w-5" />}
          label="AI Assistant"
          active={pathname === "/ai-assistant"}
        />
      </div>
      <div className="mt-auto px-3 py-4 border-t dark:border-gray-800">
        <NavItem
          href="/settings"
          icon={<Settings className="h-5 w-5" />}
          label="Settings"
          active={pathname === "/settings"}
        />
        <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
          <LogOut className="h-5 w-5" />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
}
