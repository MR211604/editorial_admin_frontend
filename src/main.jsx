import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "./index.css";
import AuthProvider from "./context/AuthProvider.jsx";
import "@mdxeditor/editor/style.css";
import { env } from "./config/env.js";

const basename = env.BASE_URL;
createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </AuthProvider>
);
