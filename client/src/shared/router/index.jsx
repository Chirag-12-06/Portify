import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../components/layout/RootLayout";

import MainPage from "../pages/MainPage";
import CertificatePage from "../../features/certificates/pages/CertificatePage";
import ProjectsPage from "../../features/projects/pages/ProjectsPage";
import ProjectSlugPage from "../../features/projects/pages/ProjectSlugPage";
import NotFoundPage from "../pages/NotFoundPage";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
        handle: { title: "Chirag Gupta" },
      },
      {
        path: "/certificates",
        element: <CertificatePage />,
        handle: { title: "Certificates" },
      },
      {
        path: "/projects",
        element: <ProjectsPage />,
        handle: { title: "Projects" },
      },
      {
        path: "/projects/:slug",
        element: <ProjectSlugPage />,
        handle: { title: "Project" },
      },
      {
        path: "*",
        element: <NotFoundPage />,
        handle: { title: "Page Not Found" },
      },
    ],
  },
]);

export default router;