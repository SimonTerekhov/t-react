import { Form,redirect, useNavigate} from "react-router-dom";
import { createShirt } from "../shirts";

export async function action({request}) {
    const formData = await request.formData();
    const create = Object.fromEntries(formData);
    const result = await createShirt(create);
    return redirect(`/${result.id}`);
  }

export default function Create(){
    const navigate = useNavigate();

    return(
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
    )
}