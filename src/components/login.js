//import logo from "../logo.svg";
//import "../css/login.css";
import React, {useState} from "react";
import {useHistory} from "react-router-dom";

function LoginPage() {
  const [getEmail, setEmail] = useState("");
  const [getPassword, setPassword] = useState("");
  const [getMessage, setMessage] = useState("");

  const history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email: getEmail, password: getPassword})
    })
      .then(res => res.json())
      .then(data => {
        if (data.login === "success") {
          setMessage(
            '<div class="notification is-primary">Login Success</div>'
          );
          history.push("/ledger");
        } else {
          setMessage('<div class="notification is-danger">Login Failed</div>');
        }
      });
  };

  return (
    <div className="column is-4 is-offset-4">
      <h3 className="title">Login</h3>
      <div className="box">
        <div dangerouslySetInnerHTML={{__html: getMessage}} />

        <form onSubmit={handleSubmit}>
          <div className="field">
            <div className="control">
              <input
                className="input is-large"
                type="email"
                name="email"
                value={getEmail}
                onChange={e => {
                  setEmail(e.target.value);
                }}
                placeholder="Your Email"
                autoFocus=""
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <input
                className="input is-large"
                type="password"
                name="password"
                value={getPassword}
                onChange={e => setPassword(e.target.value)}
                placeholder="Your Password"
              />
            </div>
          </div>
          <div className="field">
            <label className="checkbox">
              <input type="checkbox" />
              Remember me
            </label>
          </div>
          <button className="button is-block is-info is-large is-fullwidth">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
