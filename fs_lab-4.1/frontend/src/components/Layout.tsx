import { NavLink, Outlet } from "react-router-dom";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export default function Layout() {
  return (
    <>
      <SiteHeader />

      <nav style={{ display: "flex", gap: "16px", padding: "12px 16px", borderBottom: "1px solid #ddd" }}>
        <NavLink
          to="/employees"
          style={({ isActive }) => ({
            textDecoration: "none",
            fontWeight: isActive ? 700 : 400,
          })}
        >
          Employees
        </NavLink>

        <NavLink
          to="/organization"
          style={({ isActive }) => ({
            textDecoration: "none",
            fontWeight: isActive ? 700 : 400,
          })}
        >
          Organization
        </NavLink>
      </nav>

      <main style={{ padding: "16px" }}>
        <Outlet />
      </main>

      <SiteFooter />
    </>
  );
}
