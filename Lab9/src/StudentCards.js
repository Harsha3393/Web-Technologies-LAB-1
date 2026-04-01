import React from "react";

function Card(props) {
  return (
    <div className="card">
      <h3>{props.name}</h3>
      <p>{props.department}</p>
      <p>Marks: {props.marks}</p>
    </div>
  );
}

function StudentCards() {
  return (
    <div>
      <h2>Student Cards</h2>
      <div className="card-container">
        <Card name="Mokshitha" department="CSE" marks="90" />
        <Card name="Rahul" department="ECE" marks="85" />
        <Card name="Anjali" department="IT" marks="92" />
      </div>
    </div>
  );
}

export default StudentCards;