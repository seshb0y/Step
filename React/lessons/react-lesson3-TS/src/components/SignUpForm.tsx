import React, { FormEvent, useState } from "react";
const Gender = {
  MALE: "male",
  FEMALE: "female",
};
 
const INITIAL_STATE = {
  email: "",
  // name: "",
  // gender: "",
  password: "",
  repeatPassword: "",
  isAgree: false,
  Gender,
  age: "",
};
 
const SignUpForm = () => {
    // const emailId = nanoid()
  const [formValues, setFormValues] = useState({ ...INITIAL_STATE });
  const { email, password, repeatPassword, isAgree, Gender, age } = formValues;
 
  const handleChange = (event: FormEvent<HTMLInputElement | HTMLSelectElement> ) => {
    const { name, value, type, checked } = event.target as HTMLInputElement;
    // console.log(name);
    // console.log(value);
 
    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(formValues);
  };
  return (
    <form action="">
      <h2>Register form</h2>
      <label htmlFor="">Email</label>
      <input onChange={handleChange} type="text" name="email" value={email} />
      <label htmlFor="">Password</label>
      <input
        onChange={handleChange}
        type="text"
        name="password"
        value={password}
      />
      <label htmlFor="">Repeat password</label>
      <input
        onChange={handleChange}
        type="text"
        name="repeatPassword"
        value={repeatPassword}
      />
      <label htmlFor="agreement">Do you agree with conditions</label>
      <input
        checked={isAgree}
        type="checkbox"
        name="isAgree"
        onChange={handleChange}
      />
 
      <section>
        <label htmlFor="">
          Male
          <input
            type="radio"
            name="gender"
            value={Gender.MALE}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="">
          Female
          <input
            type="radio"
            name="gender"
            value={Gender.FEMALE}
            onChange={handleChange}
          />
        </label>
      </section>
      <label htmlFor="">
        Select your age
        <select name="age" value={age} onChange={handleChange}>
            <option value="" disabled></option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
        </select>
      </label>
     
      <button onClick={handleSubmit}>submit</button>
    </form>
  );
};
 
export default SignUpForm;