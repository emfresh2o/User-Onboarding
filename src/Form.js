import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';

export default function Form () {
//state form inputs
    const [userForm, setUserForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
        terms: true
    });

// temporary post state
    const [post, setPost] = useState([]);

// set server error
    const [serverError, setServerError] = useState("");

// set button behavior
    const [buttonDisabled, setButtonDisabled] = useState(true);

// managing state error
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
        terms: ""
    });

    
// set validation for key value pair
    const validateChange = (e) => {

        yup
            .reach(schema, e.target.name)
            .validate(e.target.name === 'terms' ? e.target.checked : e.target.value)
            .then((valid) => {
                setErrors({
                    ...errors,
                    [e.target.name]: "" // when all errors are all cleared input will be all valid
                });
            })
            .catch((error) => {
                console.log(error);
                setErrors({
                    ...errors,
                    [e.target.name]: error.errors[0] // takes the 0 index value in the array
                });
            });
        };
    
//set onSubmit function

    const submitForm = (e) => {
        e.preventDefault();
        axios
            .post("https://reqres.in/api/users", userForm)
            .then((response) => {
                setPost(response.data); 
                setServerError(null); // when validation throws an error on server side
                setUserForm({
                    name: "",
                    email: "",
                    password: "",
                    role: "",
                    terms: true
                });
            })
            .catch((error) => {
                console.log(error)
            });
        };

//set handling change
    const inputChange = (e) => {
        e.persist(); // persisting the evt obj not to be deleted until all obj has been used and validated and cleared
        const newUserData = {
            ...userForm, [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value };

        validateChange(e); //do inline validation
        setUserForm(newUserData); //updating new user data

}
// set schema 
const schema = yup.object().shape({
    name: yup.string().required("field is required"),
    email: yup.string().email("valid email required").required("must include email"),
    password: yup.string().min(8, "Must be 8 characters!").max(10).required("Create a unique password."),
    role: yup.string().oneOf(["Maleficent", "Fairy", "Princess", "Thistlewit", "Knotgrass"], "Select your role"),
    terms: yup.boolean().oneOf([true], "Please agree to T&Cs")
});

useEffect(() => {
    schema.isValid(userForm).then((isValid) => {
        setButtonDisabled(!isValid); //sets Button to control errors when submitted
    });

}, [userForm]);
    
return (
    <form onSubmit={submitForm}>
        {serverError ? <p className='error'>{serverError}</p> : null}
        <label htmlFor="name">
            Name
            <input
                id="name"
                type="text"
                name="name"
                value={userForm.name}
                onChange={inputChange}
            />
            {errors.name.length > 0 ? <p className='error'>{errors.name}</p> : null}
        </label>
        <label htmlFor="email">
            Email
            <input
                id="email"
                type="text"
                name="email"
                value={userForm.email}
                onChange={inputChange}
            />
            {errors.email.length > 0 ? <p className='error'>{errors.email}</p> : null}
        </label>
        <label htmlFor="password">
            Password
            <input
                id="password"
                type="text"
                name="password"
                value={userForm.password}
                onChange={inputChange}
            />
            {errors.password.length > 0 ? <p className='error'>{errors.password}</p> : null}
        </label>
        <label htmlFor="role">
            Role
            <select
                id="role"
                name="role"
                value={userForm.role}
                onChange={inputChange}>
                <option> -- Who are you? -- </option>
                <option value="Maleficent">Maleficent</option>
                <option value="Fairy">Fairy</option>
                <option value="Princess">Princess</option>
                <option value="Thistlewit">Thistlewit</option>
                <option value="Knotgrass">Knotgrass</option>
            </select>
            {errors.role.length > 0 ? <p className='error'>{errors.role}</p> : null}
        </label>
        <label htmlFor="terms" className="terms">
        <input
          type="checkbox"
          id="terms"
          name="terms"
          checked={userForm.terms}
          onChange={inputChange}
        />
        Terms & Cs
        {errors.terms.length > 0 ? <p className='error'>{errors.terms}</p> : null}
        </label>
        <button disabled={buttonDisabled} type="submit">
        Submit
      </button>
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </form>
    )};
