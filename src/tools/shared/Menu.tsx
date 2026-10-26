import { useState, type ReactNode } from "react";
import { NavLink } from "react-router";
import {
  FiChevronLeft,
  FiChevronRight,
  FiHome,
  FiEdit3,
  FiClock,
  FiHeadphones,
  FiBarChart2,
  FiCheckSquare,
  FiMessageSquare,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import "../css/menu.css";
import { useTheme } from "../hooks/LOCAL/useTheme";
import { useShortcuts } from "../hooks/LOCAL/useShortcuts";

export type MenuItem = {
  label: string;
  icon: ReactNode;
  href?: string;
  onClick?: () => void;
  mobile?: boolean;
};

export default function Menu({
  items = [
    { label: "Home", icon: <FiHome />, href: "/", mobile: true },
    { label: "Real test", icon: <FiClock />, href: "/test", mobile: true },
    { label: "Practice", icon: <FiEdit3 />, href: "/practice", mobile: true },
    {
      label: "Listening & Reading",
      icon: <FiHeadphones />,
      href: "/answer-sheet",
      mobile: true,
    },
    { label: "History", icon: <FiBarChart2 />, href: "/history", mobile: true },
    { label: "To-do list", icon: <FiCheckSquare />, href: "/todo" },
    { label: "Feedback", icon: <FiMessageSquare />, href: "/feedback" },
  ],
}: {
  items?: MenuItem[];
}) {
  const [collapsed, setCollapsed] = useState(true);
  const { theme, toggleTheme } = useTheme();

  useShortcuts({ "ctrl+j": toggleTheme });

  const menuItems: MenuItem[] = [
    ...items,
    {
      label: theme === "dark" ? "Light theme" : "Dark theme",
      icon: theme === "dark" ? <FiSun /> : <FiMoon />,
      onClick: toggleTheme,
      mobile: true,
    },
  ];

  return (
    <nav className={`menu ${collapsed ? "menu-collapsed" : ""}`}>
      <button
        type="button"
        className="menu-toggle"
        onClick={() => setCollapsed((value) => !value)}
        aria-label="Toggle sidebar"
      >
        {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
      </button>

      {menuItems.map((item) => {
        const className = `menu-item ${
          item.mobile ? "menu-mobile-visible" : "menu-desktop-only"
        }`;

        const content = (
          <>
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-label">{item.label}</span>
          </>
        );

        return item.onClick ? (
          <button
            key={item.label}
            type="button"
            className={className}
            onClick={item.onClick}
            title={item.label}
          >
            {content}
          </button>
        ) : item.href ? (
          // NavLink adds .active on the current page; `end` so "/" isn't active everywhere
          <NavLink
            key={item.href}
            to={item.href}
            end={item.href === "/"}
            className={className}
            title={item.label}
          >
            {content}
          </NavLink>
        ) : null;
      })}
    </nav>
  );
}
