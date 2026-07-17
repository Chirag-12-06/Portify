import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Drawer from "../components/layout/Sidebar/Drawer";

export default function MainLayout() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Navbar />

      <Drawer
        open={open}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      />

      <Outlet />
    </>
  );
}
