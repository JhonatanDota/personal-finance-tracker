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
          className={`flex items-center gap-3 w-full h-12 px-4 rounded-md transition-colors
            ${
              isActive
                ? "bg-green-600 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
        >
          <span className="w-5 h-5">{icon}</span>
          <span className="text-sm font-medium">{name}</span>
        </div>
      )}
    </NavLink>
  );
}
