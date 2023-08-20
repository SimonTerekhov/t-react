import { Outlet, Link, useLoaderData, Form, redirect, NavLink, useNavigation, useSubmit, } from "react-router-dom";
import {getShirts} from "../shirts";
import { useEffect } from "react";

export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const shirts = await getShirts(q);
    return { shirts, q };
}


export default function Index(){
    const { shirts, q } = useLoaderData();
    console.log(shirts);
    const navigation = useNavigation();
    useEffect(() => {
        document.getElementById("q").value = q;
      }, [q]);

      const user = JSON.parse(localStorage.getItem("user"));
      const jwt = localStorage.getItem("jwt");


      const submit = useSubmit();
      const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has(
      "q"
    );

    return (
    <>
      <div id="sidebar">
        <h1>Goofy shirts</h1>
          <Form id="search-form" role="search">
              <input
                id="q"
                className={searching ? "loading" : ""}
                aria-label="Search posts"
                placeholder="Search for shirts"
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
          <NavLink to="/create"><button>Create your own shirt</button></NavLink>
      </div>
      <div className="container__shirts">
          {shirts.length ? (
              <>
                  {shirts.map((shirt) => (
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
              </>
          ) : (
              <p>No shirts found</p>
          )}
      </div>
    </>
    )
}