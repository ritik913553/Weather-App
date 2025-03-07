import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import WeatherProvider from "./context/weatherContext.jsx";

createRoot(document.getElementById("root")).render(
  <WeatherProvider>
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </WeatherProvider>
);
