import { useLoaderData } from "react-router-dom";
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
    console.log(likes);
    console.log(shirts);

    const likedShirts = shirts.filter(shirt => likes.some(like => like.idshirt === shirt.id));

    console.log(likedShirts);
    return(
        <>
            {likedShirts.map(shirt => (
                <div className="item" key={shirt.id}>
                    <h1>{shirt.title}</h1>
                    <p>{shirt.description}</p>
                </div>
            ))}
        </>
    )
}