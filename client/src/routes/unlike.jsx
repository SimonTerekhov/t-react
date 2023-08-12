import { redirect } from "react-router-dom";
import { removeLike, getLike } from "../likes";

export async function action({ params }) {
    const jwt = localStorage.getItem("jwt");
    const user = JSON.parse(localStorage.getItem("user"));

    const result = await getLike(params.shirtId, user.id);

    await removeLike(jwt, result.id);
    return redirect(`/${params.shirtId}`);
  }