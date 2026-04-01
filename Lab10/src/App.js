import React, { useState } from "react";
import "./App.css";
import FormValidation from "./FormValidation";
import ListManager from "./ListManager";
import ApiFetch from "./ApiFetch";

function App() {
  const [active, setActive] = useState("ex1");

  return (
    <div className="app">
      <h1 className="title">React Lab 10</h1>

      <div className="nav">
        <button onClick={() => setActive("ex1")}>Form</button>
        <button onClick={() => setActive("ex2")}>List</button>
        <button onClick={() => setActive("ex3")}>API</button>
      </div>

      <div className="content">
        {active === "ex1" && <FormValidation />}
        {active === "ex2" && <ListManager />}
        {active === "ex3" && <ApiFetch />}
      </div>
    </div>
  );
}

export default App;