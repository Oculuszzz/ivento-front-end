import React from "react";
import AppShellCustom from "./components/AppShellCustom";
import "./App.css";
import { AuthContextProvider } from "./context/Auth-context";
import AuthWrapper from "./components/AuthWrapper";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <AuthWrapper>
          <AppShellCustom />
        </AuthWrapper>
      </AuthContextProvider>
    </div>
  );
}

export default App;
