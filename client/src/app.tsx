import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "@/pages/Home";
import ProblemsPage from "./pages/ProblemsPage";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./components/ui/dashboard";
import ProblemDetailsPage from "./pages/ProblemDetailsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // ✅ outer layout
    children: [
      { index: true, element: <Home /> },
      {
        path:"problems",
        element:<ProblemsPage/>
      },
      {
        path:"problem/:id",
        element:<ProblemDetailsPage/>
      },
      // for later use
      {
        path: "dashboard",
        element: <DashboardLayout />, // ✅ nested layout
        children: [
          { index: true, element: <Dashboard /> },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
