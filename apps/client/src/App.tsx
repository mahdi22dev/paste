import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const [response, setResponse] = useState("");
  useEffect(() => {
    fetch("/api").then(async (data) => {
      const res = await data.text();
      setResponse(res);
    });
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          {" "}
          <div>
            <a href="https://vitejs.dev" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1>Vite + React</h1>
          <div className="card">{response}</div>
        </>
      ),
    },
    {
      path: "/home",
      element: <div>Home page</div>,
    },
    {
      path: "/about",
      element: <div>about page</div>,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
