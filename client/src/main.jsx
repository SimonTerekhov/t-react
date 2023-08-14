import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider, } from "react-router-dom";
import React from 'react'
import './index.css'

//routes
import Root from "./routes/root";
import Index, {loader as indexLoader} from "./routes/index";
import ErrorPage from "./error-page";
import Shirt, {loader as shirtDetailLoader} from "./routes/shirt";
import Create, {action as createAction} from "./routes/create";
import Edit, {action as editAction} from "./routes/edit";
import {action as destroyAction} from "./routes/destroy";
import Login, {action as loginAction} from "./routes/login";
import Register, {action as registerAction} from "./routes/register"
import {action as likeAction} from "./routes/like"
import {action as unlikeAction} from "./routes/unlike"

//roots profile
import Account from "./routes/account/account";
import Likes, {loader as likesLoader} from "./routes/account/likes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Index/>,
        loader: indexLoader,
      },
      {
        path: "/:shirtId",
        element: <Shirt />,
        loader: shirtDetailLoader,
      },
      {
        path: "/:shirtId/edit",
        element: <Edit/>,
        loader: shirtDetailLoader,
        action: editAction,
      },
      {
        path: "/:shirtId/like",
        action: likeAction,
      },
      {
        path: "/:shirtId/unlike",
        action: unlikeAction,
      },
      {
        path: "/:shirtId/destroy",
        action: destroyAction,
      },
      {
        path: "/create",
        element: <Create />,
        action: createAction,
      },
      {
        path: "/:username",
        element: <Account />,
        children: [
          {
            path: "likes",
            element: <Likes />,
            loader: likesLoader,
          },
        ]
      },
      {
        path: "/login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "/register",
        element: <Register />,
        action: registerAction,
      }
      
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
