import { useLoaderData, Form, redirect, useNavigate } from "react-router-dom";
import { editShirt } from "../shirts";
import { useState } from "react";
import jwtDecode from "jwt-decode";

export async function action({ request, params }) {
    const formData = await request.formData();
    const edits = Object.fromEntries(formData);
    const jwt = localStorage.getItem("jwt");
    await editShirt(jwt, params.shirtId, edits);
    return redirect(`/${params.shirtId}`);   
}

export default function Edit(){
    const { shirt } = useLoaderData();
    const navigate = useNavigate();
    const [shirtDetails, setShirtDetails] = useState({color: `${shirt.shirtcolor}`, shirttext: `${shirt.shirttext}`});

    const handleColorChange = (e) =>{
      setShirtDetails({
        ...shirtDetails,
        color: e.target.value})
    }
    const handleTextChange = (e) =>{
      setShirtDetails({
        ...shirtDetails,
        shirttext: e.target.value
      })
    }
    return(
        <>
        <div className="container__shirt">
            <img className="shirt" src="/shirt.png" alt="shirt" />
            <svg className="drawing__surface" width="150" height="150" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <circle cx="75" cy="75" r="70" stroke="black" fill={shirtDetails.color} strokeWidth="5"/>
              <circle cx="75" cy="75" r="15" stroke="black" fill="#E7E7F2" strokeWidth="3.5"/>
              <circle cx="50" cy="50" r="8" stroke="black" fill="transparent" strokeWidth="3.5"/>
              <circle cx="100" cy="50" r="8" stroke="black" fill="transparent" strokeWidth="3.5"/>
            </svg>
            <p className="shirt__text">{shirtDetails.shirttext}</p>
        </div>
        <Form method="post" id="edit__form">
            <p>Title:</p>
            <input type="text" defaultValue={shirt.title}name="title" />
            <p>Shirt text:</p>
            <input type="text" name="shirttext" maxLength="12" defaultValue={shirt.shirttext} onChange={handleTextChange}/>
            <p>Color:</p>
            <input type="color" name="shirtcolor" value={shirtDetails.color} onChange={handleColorChange}/>
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
        </>
    )
}