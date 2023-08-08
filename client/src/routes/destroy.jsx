import { Form, useLoaderData, redirect } from "react-router-dom";
import { deleteShirt } from "../shirts";

export async function action({ params }) {
    await deleteShirt(params.shirtId);
    return redirect("/");
  }