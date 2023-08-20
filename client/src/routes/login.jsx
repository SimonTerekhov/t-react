import React, { useContext } from "react";
import { Form, NavLink, useNavigate } from "react-router-dom";
import { authenticate } from "../auth";
import { LoginContext } from "./root";

export default function Login() {
  const [loginState, setLoginState] = useContext(LoginContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const formData = new FormData(document.getElementById("login__form"));
    const { email, password } = Object.fromEntries(formData);

    try {
      const { jwt, user } = await authenticate(email, password);
      localStorage.setItem("jwt", jwt);
      localStorage.setItem("user", JSON.stringify(user));
      setLoginState(user);
      navigate("/");
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  return (
    <Form style={{ margin: "0 auto", display: "flex", flexDirection: "column" }} id="login__form">
      <h1>Login</h1>
      <p>Username or Email:</p>
      <input type="text" required name="email" />
      <p>Password:</p>
      <input type="password" required name="password" />
      <button onClick={handleLogin} type="button">Login</button>
      <NavLink to="/register">Register</NavLink>
    </Form>
  );
}
