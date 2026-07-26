import { createBrowserRouter } from "react-router-dom";

import MainPage from "../pages/MainPage";
import CertificatePage from "../../features/certificates/pages/CertificatePage";
import ProjectsPage from "../../features/projects/pages/ProjectsPage";
import ProjectSlugPage from "../../features/projects/pages/ProjectSlugPage";

import NotFoundPage from "../pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/certificates",
    element: <CertificatePage />,
  },
  {
    path: "/projects",
    element: <ProjectsPage />,
  },
  {
    path: "/projects/:slug",
    element: <ProjectSlugPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
