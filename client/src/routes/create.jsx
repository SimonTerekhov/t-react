import { Form,redirect, useNavigate} from "react-router-dom";
import { createShirt } from "../shirts";
import jwtDecode from "jwt-decode";
import { useState } from "react";

export async function action({request}) {
    const jwt = localStorage.getItem("jwt");
    const user = JSON.parse(localStorage.getItem("user"));

    const formData = await request.formData();
    const create = Object.fromEntries(formData);
    const result = await createShirt(jwt, user.id, create);
    if (!jwt || !user || !user.id) {
        return redirect("/login");
    }
    const decodedToken = jwtDecode(jwt);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      return redirect("/login");
    }

    return redirect(`/${result.id}`);
  }

export default function Create(){
    const navigate = useNavigate();
    const [shirtColor, setShirtColor] = useState("#6161ff");
    const [shirtText, setShirtText] = useState("");

    const handleColorChange = (e) =>{
      setShirtColor(e.target.value)
    }
    const handleTextChange = (e) =>{
      setShirtText(e.target.value)
    }
    return(
        <div className="create-flow">
        <div className="container__shirt">
            <img className="shirt" src="/shirt.png" alt="shirt" />
            <svg className="drawing__surface" width="150" height="150" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <circle cx="75" cy="75" r="70" stroke="black" fill={shirtColor} strokeWidth="5"/>
              <circle cx="75" cy="75" r="15" stroke="black" fill="#E7E7F2" strokeWidth="3.5"/>
              <circle cx="50" cy="50" r="8" stroke="black" fill="transparent" strokeWidth="3.5"/>
              <circle cx="100" cy="50" r="8" stroke="black" fill="transparent" strokeWidth="3.5"/>
            </svg>
            <p className="shirt__text">{shirtText}</p>
        </div>
        <Form method="post" id="create__form">
            <p>Title:</p>
            <input type="text" required name="title" />
            <p>Shirt text:</p>
            <input type="text" required name="shirttext" onChange={handleTextChange}/>
            <p>Color:</p>
            <input type="color" name="shirtcolor" value={shirtColor} onChange={handleColorChange}/>
            <div className="create__buttons">
                <button type="submit" id="submitter">Create</button>
                  <button
                    type="button"
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    Cancel
                </button>
            </div>
        </Form>
        </div>
    )
}