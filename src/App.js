import React from "react";
import { Routes, Route } from "react-router-dom";
import AppShellCustom from "./components/AppShellCustom";
import Signin from "./components/Signin";
import "./App.css";

function App() {
  return (
    <div className="App">
      <AppShellCustom />
    </div>
  );
}

export default App;
