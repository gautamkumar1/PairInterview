import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "@/pages/Home";
import ProblemsPage from "./pages/ProblemsPage";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./components/ui/dashboard";
import ProblemDetailsPage from "./pages/ProblemDetailsPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import ProfilePage from "./pages/ProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // ✅ outer layout
    children: [
      { index: true, element: <Home /> },
      {
        path: "dashboard",
        element: <DashboardLayout />, // ✅ nested layout
        children: [
          { index: true, element: <Dashboard /> },
          { path: "problems", element: <ProblemsPage /> },
          { path: "problem/:id", element: <ProblemDetailsPage /> },
          { path: "leaderboard", element: <LeaderboardPage /> },
          { path: "profile", element: <ProfilePage /> },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
