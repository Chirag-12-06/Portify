import { createBrowserRouter } from "react-router-dom";

import MainPage from "../pages/MainPage";
import CertificatePage from "../pages/CertificatePage";
import ProjectsPage from "../pages/ProjectsPage";

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
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
