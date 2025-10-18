import { useNavigate } from "react-router-dom";

import { removeToken } from "../../../../functions/auth";

import { logout } from "../../../../requests/authRequests";

import { handleErrors } from "../../../../requests/handleErrors";

import MenuItem from "./MenuItem";

import { FiGrid, FiRepeat, FiTag } from "react-icons/fi";

interface MenuItemsProps {
  onNavigate?: () => void;
}

export default function MenuItems(props: MenuItemsProps) {
  const { onNavigate } = props;

  const navigate = useNavigate();

  const items = [
    { name: "Dashboard", path: "/dashboard", icon: <FiGrid /> },
    { name: "Categorias", path: "/categories", icon: <FiTag /> },
    { name: "Transações", path: "/transactions", icon: <FiRepeat /> },
  ];

  async function handleLogout() {
    try {
      await logout();
      removeToken();
      navigate("/login");
    } catch (error) {
      handleErrors(error);
    }
  }

  return (
    <nav className="flex flex-col gap-2 px-3 h-full">
      {items.map((item) => (
        <MenuItem
          key={item.path}
          name={item.name}
          path={item.path}
          icon={item.icon}
          onNavigate={onNavigate}
        />
      ))}

      <button onClick={handleLogout} className="button-logout">
        SAIR
      </button>
    </nav>
  );
}
