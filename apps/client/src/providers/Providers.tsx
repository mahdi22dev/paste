import { RouterProvider } from "react-router-dom";
import routers from "../routes/routes";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "./AuthGuard";
function Providers() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={routers} />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default Providers;
