import {Form, useLoaderData, redirect, useNavigate} from "react-router-dom";
import {authenticate} from "../auth";

export async function action({request}) {
    const formData = await request.formData();
    const {email,password} = Object.fromEntries(formData);
    const {jwt, user} = await authenticate(email,password);

    localStorage.setItem("jwt",jwt);
    localStorage.setItem("user",JSON.stringify(user));

    console.log(localStorage)
    return redirect("/");
}

export default function Login(){
    return(
        <Form method="post" id="login__form">
            <input type="text" name="email" />
            <input type="password" name="password" />
            <button type="submit">Login</button>
        </Form>
    )
}