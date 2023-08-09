import { Form,redirect, useNavigate} from "react-router-dom";
import { createShirt } from "../shirts";
import jwtDecode from "jwt-decode";

export async function action({request}) {
    const formData = await request.formData();
    const create = Object.fromEntries(formData);
    const result = await createShirt(create);

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

    return(
        <>
        <div className="container__shirt">
            <img style={{width:"45vw"}}src="/shirt.png" alt="shirt" />
            <div className="drawing__surface" >

            </div>
        </div>
        <Form method="post" id="create__form">
            <input type="text" name="title" />
            <input type="text" name="description" />
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