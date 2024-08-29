import ErrorPage from "@/error-page";
import { Home, About } from "../components/Pages";
import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/layout";

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
        element: <div>Sign in</div>,
      },
    ],
  },
]);

export default routers;
