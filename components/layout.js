/* eslint-disable react/prop-types */
import NavBar from "./NavBarDashboard";
import SideNav from "./SideNav";

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <SideNav />
      <main>{children}</main>
    </>
  );
}
