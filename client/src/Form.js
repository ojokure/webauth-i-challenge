import React, { useState, useEffect } from "react";
import axios from "axios";

function Form(props) {
  const initialForm = {
    username: "",
    password: ""
  };

  const [form, setForm] = useState(initialForm);
  const [state, setState] = useState("");

  const onUsernameChange = e => {
    setForm({ ...form, username: e.target.value });
  };
  const onPasswordChange = e => {
    setForm({ ...form, password: e.target.value });
  };

  const onRegister = e => {
    e.preventDefault();
    axios
      .post("http://localhost:3800/api/auth/register", form)
      .then(res => {
        setState(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onLogin = e => {
    e.preventDefault();
    axios
      .post("http://localhost:3800/api/auth/login", form)
      .then(res => {
        debugger
        console.log(res.data)
      })
      .catch(error => {
        debugger
        console.log(error);
      });
  };
  return (
    <form>
      <div>
        <label htmlFor="usernameInput"> Username </label>
        <input
          value={form.username}
          onChange={onUsernameChange}
          id="usernameInput"
          type="text"
        />
      </div>
      <div>
        <label htmlFor="passwordInput"> Password</label>
        <input
          value={form.password}
          onChange={onPasswordChange}
          id="passwordInput"
          type="text"
        />
      </div>
      <div>
        <button onClick={onRegister}>Sign Up</button>
        <button onClick={onLogin}>Log in</button>
      </div>
    </form>
  );
}
export default Form;
