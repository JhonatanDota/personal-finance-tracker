import MenuItem from "./MenuItem";

import { FiGrid, FiRepeat, FiTag } from "react-icons/fi";

interface MenuItemsProps {
  onNavigate?: () => void;
}

const items = [
  { name: "Dashboard", path: "/dashboard", icon: <FiGrid /> },
  { name: "Transações", path: "/transactions", icon: <FiRepeat /> },
  { name: "Categorias", path: "/categories", icon: <FiTag /> },
];

export default function MenuItems(props: MenuItemsProps) {
  const { onNavigate } = props;

  return (
    <nav className="flex flex-col w-full py-2">
      {items.map((item) => (
        <MenuItem
          key={item.path}
          name={item.name}
          path={item.path}
          icon={item.icon}
          onNavigate={onNavigate}
        />
      ))}
    </nav>
  );
}
