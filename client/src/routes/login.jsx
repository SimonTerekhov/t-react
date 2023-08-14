import {Form, useLoaderData, redirect, useNavigate, useOutletContext, NavLink} from "react-router-dom";
import { useEffect } from "react";
import {authenticate} from "../auth";

export async function action({request}) {
    const formData = await request.formData();
    const {email,password} = Object.fromEntries(formData);
    const {jwt, user} = await authenticate(email,password);
    localStorage.setItem("jwt",jwt);
    localStorage.setItem("user",JSON.stringify(user));
    return redirect("/");
}

export default function Login(){
    
    return(
        <Form style={{margin: "0 auto", display: "flex", flexDirection: "column"}} method="post" id="login__form">
            <h1>Login</h1>
            <p>Username or Email:</p>
            <input type="text" required name="email" />
            password:
            <input type="password" required name="password" />
            <button type="submit">Login</button>
            <NavLink to="/register">register</NavLink>
        </Form>
    )
}