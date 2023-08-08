import { Outlet, NavLink } from "react-router-dom";

export default function Root() {
    return (
      <>
        <nav className="nav__items">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/create">Create</NavLink>
            <NavLink to="/admin/details">Profile</NavLink>
            <NavLink to="/admin/likes">Likes</NavLink>
        </nav>
        <main>
            <Outlet />
        </main>
      </>
    );
  }