import { useLoaderData, Form, redirect } from "react-router-dom";
import { editShirt } from "../shirts";

export async function action({ request, params }) {
    const formData = await request.formData();
    const edits = Object.fromEntries(formData);
    await editShirt(params.shirtId, edits);
    return redirect(`/${params.shirtId}`);
  }


export default function Edit(){
    const { shirt } = useLoaderData();

    return(
        <Form method="post" id="edit__form">
            <input defaultValue={shirt.title} type="text" name="title" />
            <input defaultValue={shirt.description}type="text" name="description" />
            <div className="create__buttons">
                <button type="submit" id="submitter">Save</button>
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