import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Outlet />
    </div>
  );
}
