import { useLoaderData, Form } from "react-router-dom";
import {getShirt} from "../shirts";
import {getLike} from "../likes";

export async function loader({ params }) {
  const user = JSON.parse(localStorage.getItem("user"));
    const shirt = await getShirt(params.shirtId);
  if (!shirt) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  const like = await getLike(params.shirtId, user.id);
  return { shirt, like };
}

export default function Shirt(){
    const { shirt, like } = useLoaderData();
    return (
        <div>
            <h1>{shirt.title}</h1>
            <p>{shirt.description}</p>
            <Form action="edit">
                <button id="edit" type="submit">edit</button>
            </Form>
            <Form method="post" action="destroy" onSubmit={(event) => {
            if (
              !confirm(
                "Please confirm you want to delete this record."
              )
            ) {
              event.preventDefault();
            }
          }}
        >
          <button id="delete" type="submit">delete</button>
        </Form>
          {like ? 
          <Form method="post" action="unlike">
            <button type="submit">💜</button>
          </Form>
          : 
          <Form method="post" action="like">
            <button id="shirt__like" type="submit">♡</button>
          </Form>}
        </div>
    )
}