import { FaWallet } from "react-icons/fa";
import MenuItems from "./MenuItems";

export default function MenuDesktop() {
  return (
    <aside className="hidden md:flex h-screen w-56 bg-[#050746] text-gray-100 flex-col gap-3 sticky top-0">
      <div className="flex items-center gap-2 h-16 px-4 border-b border-[#0D1073]">
        <FaWallet className="h-4 w-4" />
        <span className="text-base font-bold">Controle Financeiro</span>
      </div>
      <MenuItems />
    </aside>
  );
}
