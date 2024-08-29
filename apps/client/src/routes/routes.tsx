import ErrorPage from "@/error-page";

import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/layout";
import { About, Home } from "./Pages";
import Signin from "./Pages/signin";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "contacts/:contactId",
        element: <Home />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/auth/signin",
        element: <Signin />,
      },
    ],
  },
]);

export default routers;
