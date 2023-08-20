import { Outlet, NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";

export const LoginContext = React.createContext();
export default function Root() {
  const [loginState, setLoginState] = useState(JSON.parse(localStorage.getItem("user")));
  console.log(loginState);
  return (
    <>
      <LoginContext.Provider value={[loginState, setLoginState]}>
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
      </LoginContext.Provider>
    </>
  );
} 