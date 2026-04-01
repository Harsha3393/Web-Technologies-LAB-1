import React from "react";

function StudentProfile() {
  const name = "Mokshitha";
  const department = "CSE";
  const year = "3rd Year";
  const section = "A";

  return (
    <div>
      <h2>Student Profile</h2>
      <p><b>Name:</b> {name}</p>
      <p><b>Department:</b> {department}</p>
      <p><b>Year:</b> {year}</p>
      <p><b>Section:</b> {section}</p>
    </div>
  );
}

export default StudentProfile;