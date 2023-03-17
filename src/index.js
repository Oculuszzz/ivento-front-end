import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "./context/Auth-context";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import { CustomFonts } from "./CustomFonts";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MantineProvider
      withNormalizeCSS
      withGlobalStyles
      theme={{
        // use custom font in MantineProvider
        fontFamily: "Ubuntu",
        fontFamilyMonospace: "Ubuntu",
        headings: { fontFamily: "Ubuntu" },
      }}
      // sx={{
      //   // or anywhere else
      //   fontFamily: "Baloo Bhaijaan 2",
      //   fontFamilyMonospace: "Baloo Bhaijaan 2",
      //   headings: { fontFamily: "Baloo Bhaijaan 2" },
      // }}
    >
      <CustomFonts />
      <Notifications />
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </MantineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
