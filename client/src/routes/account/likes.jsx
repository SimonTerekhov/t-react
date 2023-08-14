import { useLoaderData, NavLink } from "react-router-dom";
import {getLikes} from "../../likes";
import {getAllShirts} from "../../shirts"

export async function loader(){
    const user = JSON.parse(localStorage.getItem("user"));
    const likes = await getLikes(user.id);
    const shirts = await getAllShirts();
    return {likes, shirts};
}

export default function Likes(){
    const {likes, shirts} = useLoaderData();

    const likedShirts = shirts.filter(shirt => likes.some(like => like.idshirt === shirt.id));
    
    return(
        <>
        <h1>Liked shirts</h1>
        <div className="create-flow">
            {likedShirts.map(shirt => (
                <NavLink className="single__shirt"  to={`/${shirt.id}`} key={shirt.id}>
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
            </NavLink>
            ))}
        </div>
        </>
    )
}