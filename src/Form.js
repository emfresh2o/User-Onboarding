import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import axios from 'axios';

export default function UserForm() {

//state form inputs
    const [newUser, setNewUser ] = useState({
    name: "",
    email: "",
    password: "",
    terms: true
    });

//onSubmit function
    const submitForm = (e) => {
    e.preventDefault();
    console.log("Success!");
    };

//onChange function
    const inputChange = (e) => {
    console.log("the input has changed!", e.target.value);
    setNewUser({ name: e.target.value });
};
//set Button function
    const [buttonDisabled, setButtonDisabled] = useState(true);


return (
    <form onSubmit={submitForm}>
        <label htmlFor="name">
            Name
            <input
                id="name"
                type="text"
                name="name"
                value={newUser.name}
                onCHange={inputChange}
            />
        </label>
        <label htmlFor="email">
            Email
            <input
                id="email"
                type="text"
                name="email"
                value={newUser.email}
                onCHange={inputChange}
            />
        </label>
        <label htmlFor="name">
            Password
            <input
                id="password"
                type="text"
                name="password"
                value={newUser.password}
                onCHange={inputChange}
            />
        </label>
        <button type="submit">
        Submit
      </button>
    </form>
)
}
