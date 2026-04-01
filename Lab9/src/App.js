import React, { useState } from "react";
import "./App.css";
import StudentProfile from "./StudentProfile";
import StudentCards from "./StudentCards";
import Counter from "./Counter";

function App() {
  const [active, setActive] = useState("ex1");

  return (
    <div className="container">
      <h1 className="title">React Lab 9</h1>

      <div className="button-group">
        <button onClick={() => setActive("ex1")}>Exercise 1</button>
        <button onClick={() => setActive("ex2")}>Exercise 2</button>
        <button onClick={() => setActive("ex3")}>Exercise 3</button>
      </div>

      {active === "ex1" && <StudentProfile />}
      {active === "ex2" && <StudentCards />}
      {active === "ex3" && <Counter />}
    </div>
  );
}

export default App;