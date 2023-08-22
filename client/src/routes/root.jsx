import { Outlet, NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";

export const LoginContext = React.createContext();
export const CartContext = React.createContext();

export default function Root() {
  const [loginState, setLoginState] = useState(JSON.parse(localStorage.getItem("user")));
  const [cartState, setCartState] = useState(1);
  const [cartDetailsState, setCartDetailsState] = useState([]); 

  const handleCart = ()=>{
    setCartState(cartState*(-1));
  }
  const handleCartSpace = ()=>{
    setCartDetailsState([]);
  }
  return (
    <>
      <LoginContext.Provider value={[loginState, setLoginState]}>
        <CartContext.Provider value={[cartDetailsState, setCartDetailsState]}>
          <nav className="nav__items">
            <div className="items__left">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/create">Create</NavLink>
            </div>
            <div className="items__right">
              <NavLink to={loginState !== null ? `${loginState.username}/likes` : `/login`}>Likes</NavLink>
              <a onClick={handleCart}>Cart</a>
            </div>
            <div className="cart" style={{display: cartState ===1 ? "none" : "block", position: "absolute"}}>{cartDetailsState.length === 0 ? (
              <p>Cart is empty</p>
              ) : (
                <>
              <ul>
                {cartDetailsState.map((item) => (
                  <li key={item.id}>
                    <h2>{item.name}: ${item.price}</h2>
                  </li>
                ))}
              </ul>
              <button onClick={handleCartSpace}>Empty cart </button>
              </>
            )}</div>
          </nav>
          <main>
              <Outlet />
          </main>
        </CartContext.Provider>
      </LoginContext.Provider>
    </>
  );
} 