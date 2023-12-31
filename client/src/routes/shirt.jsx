import { useLoaderData, Form, NavLink } from "react-router-dom";
import {getShirt} from "../shirts";
import {getLike} from "../likes";
import {getUser} from "../auth";
import { CartContext } from "./root";
import {useContext} from "react"

export async function loader({ params }) {
  const user = JSON.parse(localStorage.getItem("user"));
  let like = false;
  const shirt = await getShirt(params.shirtId);
  if (!shirt) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  if(user){
    like = await getLike(params.shirtId, user.id);
  }
  const username = await getUser(shirt.authorId);
  return { shirt, like, username };
}

export default function Shirt(){
    const { shirt, like,username } = useLoaderData();
    const user = JSON.parse(localStorage.getItem("user"));
    
    const [cartDetailsState, setCartDetailsState] = useContext(CartContext);

    const handleCart = (cartDetails) =>{
      setCartDetailsState([...cartDetailsState, cartDetails]);
    }
    return (
        <div className="shirt__details">
        <div className="container__shirt">
                            <img className="shirt" src="/shirt.png" alt="shirt" />
                            <svg className="drawing__surface" width="150" height="150" version="1.1" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="75" cy="75" r="70" stroke="black" fill={shirt.shirtcolor} strokeWidth="5"/>
                              <circle cx="75" cy="75" r="15" stroke="black" fill="#E7E7F2" strokeWidth="3.5"/>
                              <circle cx="50" cy="50" r="8" stroke="black" fill="transparent" strokeWidth="3.5"/>
                              <circle cx="100" cy="50" r="8" stroke="black" fill="transparent" strokeWidth="3.5"/>
                            </svg>
                            <p className="shirt__text">{shirt.shirttext}</p>
                          </div>
        <div>
            <h1>{shirt.title}</h1>
            <p>{shirt.author}</p>
            <p>{shirt.description}</p>
            {user && user.username && user.username === username.username ?
            <>
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
            </Form></>: <></>}
          {like ? 
          <Form method="post" action="unlike">
            <button type="submit">💜</button>
          </Form>
          : (user !== null ? <Form method="post" action="like">
          <button id="shirt__like" type="submit">♡</button>
        </Form> : <NavLink to="/login"><button id="shirt__like" type="button">♡</button></NavLink>)}
        <button onClick={() => handleCart({ id: shirt.id, name: shirt.title, price: 10 })}>Add to cart</button>
        </div>
        </div>
    )
}