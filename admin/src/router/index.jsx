import { createBrowserRouter } from "react-router-dom";

import GuestRoute from "./GuestRoute";
import ProtectedRoute from "./ProtectedRoute";

import LoginPage from "../features/auth/pages/LoginPage";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import ProfilePage from "../features/profile/pages/ProfilePage";
import SocialLinksPage from "../features/social-links/pages/SocialLinkPage";
import SkillsPage from "../features/skills/pages/SkillPage";
import EducationPage from "../features/education/pages/EducationPage";
import ContactMessagesPage from "../features/contacts/pages/ContactMessagesPage";

import { Routes } from "../lib/routes";

import DashboardLayout from "../layouts/DashboardLayout";

const router = createBrowserRouter([
  {
    element: <GuestRoute />,
    children: [
      {
        path: Routes.LOGIN,
        element: <LoginPage />,
      },
    ],
  },

  {
  element: <ProtectedRoute />,
  children: [
    {
      element: <DashboardLayout />,
      children: [
        {
          path: Routes.DASHBOARD,
          element: <DashboardPage />,
        },
        {
          path: Routes.PROFILE,
          element: <ProfilePage />,
        },
        {
          path: Routes.SOCIAL_LINKS,
          element: <SocialLinksPage />,
        },
        {
          path: Routes.SKILLS,
          element: <SkillsPage />,
        },
        {
          path: Routes.EDUCATIONS,
          element: <EducationPage />,
        },
        {
          path: Routes.CONTACT_MESSAGES,
          element: <ContactMessagesPage />,
        }
      ],
    },
  ],
}
]);

export default router;