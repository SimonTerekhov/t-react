import {Form, redirect} from "react-router-dom"
import {register} from "../auth"

export async function action({request}){
    const formData = await request.formData();
    const { email, password, username } = Object.fromEntries(formData);
    const { jwt, user } = await register(email, password, username);
    
    localStorage.setItem("jwt", jwt);
    localStorage.setItem("user", JSON.stringify(user));

    return redirect(`/`);
}

export default function Register(){
    return(
        <Form method="post">
            <p>email:</p>
            <input type="text" name="email" />
            <p>username:</p>
            <input type="text" name="username" />
            <p>password:</p>
            <input type="password" name="password" />
            <button type="submit">Register</button>
        </Form>
    )
}

