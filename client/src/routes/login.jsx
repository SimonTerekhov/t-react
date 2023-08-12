import {Form, useLoaderData, redirect, useNavigate, useOutletContext} from "react-router-dom";
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
        <Form method="post" id="login__form">
            <input type="text" defaultValue="admin" name="email" />
            <input type="password" defaultValue="snakeoil" name="password" />
            <button type="submit">Login</button>
        </Form>
    )
}