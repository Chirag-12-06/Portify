import { Outlet } from "react-router-dom";
import PageTitle from "./PageTitle";

export default function RootLayout() {
  return (
    <>
      <PageTitle />
      <Outlet />
    </>
  );
}