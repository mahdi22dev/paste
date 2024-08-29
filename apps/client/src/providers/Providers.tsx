import { RouterProvider } from "react-router-dom";
import routers from "../routes/routes";
import { ThemeProvider } from "@/components/theme-provider";
function Providers() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={routers} />
    </ThemeProvider>
  );
}

export default Providers;
