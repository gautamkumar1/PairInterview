import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
// import DashboardLayout from "./layouts/DashboardLayout";
import Home from "@/pages/Home";
// import Dashboard from "./pages/Dashboard";
// import Profile from "./pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // ✅ outer layout
    children: [
      { index: true, element: <Home /> },
      // for later use
      // {
      //   path: "dashboard",
      //   element: <DashboardLayout />, // ✅ nested layout
      //   children: [
      //     { index: true, element: <Dashboard /> },
      //     { path: "profile", element: <Profile /> },
      //   ],
      // },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
