import { NavLink, Outlet } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export default function Layout() {
  return (
    <>
      <SiteHeader />

      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          padding: "12px 16px",
          borderBottom: "1px solid #ddd",
        }}
      >
        <div style={{ display: "flex", gap: "16px" }}>
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
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <SignedOut>
            <SignInButton mode="modal">
              <button type="button">Log In</button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton />
            <SignOutButton>
              <button type="button">Log Out</button>
            </SignOutButton>
          </SignedIn>
        </div>
      </nav>

      <main style={{ padding: "16px" }}>
        <Outlet />
      </main>

      <SiteFooter />
    </>
  );
}