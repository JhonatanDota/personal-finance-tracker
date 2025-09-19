import { useState } from "react";

import MenuItems from "./MenuItems";

import { FiMenu, FiX } from "react-icons/fi";
import { FaWallet } from "react-icons/fa";

export default function Menu() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="flex md:hidden items-center justify-between h-14 px-2">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded hover:bg-gray-700"
        >
          <FiMenu className="h-7 w-7 text-white" />
        </button>
      </div>

      <aside className="hidden md:flex h-screen w-56 bg-[#050746] text-gray-100 flex-col gap-3 sticky top-0">
        <div className="flex items-center gap-2 h-16 px-4 border-b border-[#0D1073]">
          <FaWallet className="h-4 w-4" />
          <span className="text-base font-bold">Controle Financeiro</span>
        </div>
        <MenuItems />
      </aside>

      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-150 ${
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute left-0 top-0 h-full w-64 bg-[#050746] text-gray-100 flex flex-col gap-3 transform transition-transform duration-300
            ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex items-center justify-between h-16 px-4 border-b border-[#0D1073]">
            <FaWallet className="h-4 w-4" />

            <span className="text-base font-bold">Controle Financeiro</span>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded hover:bg-gray-700"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>
          <MenuItems onNavigate={() => setMobileOpen(false)} />
        </div>
      </div>
    </>
  );
}
