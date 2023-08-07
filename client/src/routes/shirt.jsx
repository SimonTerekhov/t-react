import { useLoaderData } from "react-router-dom";
import {getShirt} from "../shirts";

export async function loader({ params }) {
    const shirt = await getShirt(params.shirtId);
  if (!shirt) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { shirt };
}

export default function Shirt(){
    const { shirt } = useLoaderData();
    return (
        <div>
            <h1>{shirt.title}</h1>
            <p>{shirt.description}</p>
        </div>
    )
}