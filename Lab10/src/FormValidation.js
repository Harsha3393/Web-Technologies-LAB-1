import React, { useState } from "react";

function FormValidation() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let err = {};
    if (!form.name) err.name = "Name required";
    if (!form.email) err.email = "Email required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) err.email = "Invalid email";
    if (!form.password) err.password = "Password required";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();

    if (Object.keys(err).length > 0) {
      setErrors(err);
    } else {
      alert("Submitted!");
      setForm({ name: "", email: "", password: "" });
      setErrors({});
    }
  };

  return (
    <div className="card">
      <h2>Form Validation</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <p className="error">{errors.name}</p>

        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <p className="error">{errors.email}</p>

        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <p className="error">{errors.password}</p>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FormValidation;