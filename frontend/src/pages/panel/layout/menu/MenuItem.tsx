import { NavLink } from "react-router-dom";

interface MenuItemProps {
  name: string;
  path: string;
  icon: React.ReactNode;
  onNavigate?: () => void;
}

export default function MenuItem(props: MenuItemProps) {
  const { name, path, icon, onNavigate } = props;

  return (
    <NavLink to={path} onClick={onNavigate} className="w-full">
      {({ isActive }) => (
        <div
          className={`flex items-center gap-1.5 w-full p-2.5 px-4 rounded-md transition-colors
            ${
              isActive
                ? "bg-success text-primary-text"
                : "text-gray-200 hover:bg-gray-600/30 hover:text-primary-text"
            }`}
        >
          <span className="flex items-center w-5 h-5">{icon}</span>
          <span className="text-sm font-medium">{name}</span>
        </div>
      )}
    </NavLink>
  );
}
