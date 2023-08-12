import { Outlet, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Root() {
  const [loginState, setLoginState] = useState(JSON.parse(localStorage.getItem("user")));
  
  return (
    <>
      <nav className="nav__items">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/create">Create</NavLink>
          <NavLink to={loginState !== null ? `${loginState.username}/details` : `/login`}>Profile</NavLink>
          <NavLink to={loginState !== null ? `${loginState.username}/likes` : `/login`}>Likes</NavLink>
      </nav>
      <main>
          <Outlet />
      </main>
    </>
  );
} 