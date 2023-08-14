import { Outlet, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Root() {
  const [loginState, setLoginState] = useState(JSON.parse(localStorage.getItem("user")));
  
  return (
    <>
      <nav className="nav__items">
        <div className="items__left">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/create">Create</NavLink>
        </div>
        <div className="items__right">
          <NavLink to={loginState !== null ? `${loginState.username}/likes` : `/login`}>Likes</NavLink>
        </div>
      </nav>
      <main>
          <Outlet />
      </main>
    </>
  );
} 