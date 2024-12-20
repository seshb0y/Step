import React, { FormEvent, useState } from "react";
 
const Form = () => {
  const [usernameInput, setUsernameInput] = useState("");
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(event);
    const form = event.target as HTMLFormElement;
    const username = form.elements.namedItem("username") as HTMLInputElement;
    const password = form.elements.namedItem("password") as HTMLInputElement;
 
    console.log(username.value);
    console.log(password.value);
  };
 
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
 
    setUsernameInput(event.currentTarget.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="">Username</label>
      <input
        value={usernameInput}
        onChange={handleChange}
        type="text"
        name="username"
        placeholder="Enter Username"
      />
      <label htmlFor="">Password</label>
      <input type="password" name="password" placeholder="Enter Password" />
      <button type="submit">Submit</button>
    </form>
  );
};
 
export default Form;