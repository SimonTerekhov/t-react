import { Form, useLoaderData, redirect } from "react-router-dom";
import { deleteShirt } from "../shirts";

export async function action({ params }) {
    const jwt = localStorage.getItem("jwt");
    await deleteShirt(jwt, params.shirtId);
    return redirect("/");
  }