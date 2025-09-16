import { Outlet } from "react-router-dom";
import AdminMenu from "./menu/Menu";

export default function PanelLayout() {
  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-background text-foreground">
      <AdminMenu />

      <main className="grow overflow-auto p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
}
