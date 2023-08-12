import { redirect } from 'react-router-dom';
import {createLike} from '../likes';

export async function action({params}){
    const jwt = localStorage.getItem("jwt");
    const user = JSON.parse(localStorage.getItem("user"));
    await createLike(jwt, params.shirtId, user.username, user.id);
    return redirect(`/${params.shirtId}`);
}