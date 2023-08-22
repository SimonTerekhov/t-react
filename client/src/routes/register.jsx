import {Form, redirect, NavLink, useNavigate} from "react-router-dom"
import {register} from "../auth"
import { LoginContext } from "./root";

export default function Register(){
    const [loginState, setLoginState] = useContext(LoginContext);
  const navigate = useNavigate();

  const handleRegister = async () => {
    const formData = new FormData(document.getElementById("register__form"));
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

    return(
        <Form style={{margin: "0 auto", display: "flex", flexDirection: "column"}} method="post" id="register__form">
            <h1>Register</h1>
            <p>email:</p>
            <input type="text" name="email" />
            <p>username:</p>
            <input type="text" name="username" />
            <p>password:</p>
            <input type="password" name="password" />
            <button onClick={handleRegister} type="button">Register</button>
            <NavLink to="/login">Already have an account?</NavLink>
        </Form>
    )
}

