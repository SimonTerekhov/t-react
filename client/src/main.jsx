import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider, } from "react-router-dom";
import './index.css'


//routes
import Root from "./routes/root";
import Index, {loader as indexLoader} from "./routes/index";
import ErrorPage from "./error-page";
import Shirt, {loader as shirtDetailLoader} from "./routes/shirt";

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
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
