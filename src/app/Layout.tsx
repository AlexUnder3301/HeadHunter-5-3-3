import { Outlet } from "react-router";
import PageHeader from "../widgets/PageHeader/PageHeader";

const Layout = () => {
  return (
    <>
      <PageHeader />
      <Outlet />
    </>
  );
};

export default Layout;
