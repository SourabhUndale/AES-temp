import { StrictMode } from "react";

import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/Router.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

window.addEventListener('unhandledrejection', (event) => {
  if (event.reason?.message?.includes('message port closed')) {
    event.preventDefault();
  }
});

const originalError = console.error;
console.error = (...args) => {
  if (args[0]?.includes?.('message port closed')) return;
  originalError(...args);
};