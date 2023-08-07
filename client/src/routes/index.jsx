import { Outlet, Link, useLoaderData, Form, redirect, NavLink, useNavigation, useSubmit, } from "react-router-dom";
import {getShirt, getShirts} from "../shirts";
import { useEffect } from "react";

export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const shirts = await getShirts(q);
    return { shirts, q };
}


export default function Index(){
    const { shirts, q } = useLoaderData();
    const navigation = useNavigation();
    useEffect(() => {
        document.getElementById("q").value = q;
      }, [q]);


      const submit = useSubmit();
      const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has(
      "q"
    );

    return (
    <>
    <div id="sidebar">
        <h1>Shirts</h1>
        <Form id="search-form" role="search">
            <input
              id="q"
              className={searching ? "loading" : ""}
              aria-label="Search posts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(event) => {
                  const isFirstSearch = q == null;
              submit(event.currentTarget.form, {
                replace: !isFirstSearch,
              });
              }}
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={!searching}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
        </Form>
    </div>
    <div className="container__shirts">
        {shirts.length ? (
            <div>
                {shirts.map((shirt) => (
                    <NavLink to={`/${shirt.id}`} key={shirt.id}>
                        <h2>{shirt.title}</h2>
                    </NavLink>
                ))}
            </div>
        ) : (
            <p>No shirts found</p>
        )}
    </div>
    </>
    )
}