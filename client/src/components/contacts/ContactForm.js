import React, { useState } from "react";

const ContactForm = () => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal"
  });

  const { name, email, phone, type } = contact;

  //Target specific item to change

  const onChange = e =>
    setContact({
      ...contact,
      [e.target.name]: e.target.value
    });

  return (
    <form>
      <h2 className="text-primary">Add Contact</h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChange}
      ></input>
      <input
        type="text"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onChange}
      ></input>
      <input
        type="text"
        placeholder="Phone"
        name="phone"
        value={phone}
        onChange={onChange}
      ></input>
      <h5>Contact Type</h5>
      <label>
        Personal
        <input
          type="radio"
          name="type"
          value="personal"
          checked={type === "personal"}
        ></input>
      </label>
      <label>
        Professional
        <input
          type="radio"
          name="type"
          value="professional"
          checked={type === "professional"}
        ></input>
      </label>
      <div>
        <input
          type="submit"
          value="Add Contact"
          className="btn btn-primary btn-block"
        ></input>
      </div>
    </form>
  );
};

export default ContactForm;
