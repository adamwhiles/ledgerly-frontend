import React, {useState, useContext} from "react";
import {useHistory} from "react-router-dom";
import {UserContext} from "../userContext";

function SignupPage() {
  const [getName, setName] = useState("");
  const [getEmail, setEmail] = useState("");
  const [getPassword, setPassword] = useState("");
  const [getPassword2, setPassword2] = useState("");
  const [getMessage, setMessage] = useState("");
  const {setUser} = useContext(UserContext);

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
          setUser(data.user);
          setMessage({Message: "Login Success", Type: "message success"});
          history.push("/ledger");
        } else {
          setMessage({Message: "Login Failed", Type: "message failed"});
        }
      });
  };

  return (
    <div className="hero is-fullheight">
      <div className="hero-body">
        <div className="container has-text-centered">
          <div
            dangerouslySetInnerHTML={{__html: getMessage.Message}}
            className={getMessage.Type}
          />

          <form onSubmit={handleSubmit}>
            <div className="field">
              <div className="control">
                <input
                  className="input is-large"
                  type="text"
                  name="name"
                  value={getName}
                  onChange={e => {
                    setName(e.target.value);
                  }}
                  placeholder="Name"
                />
              </div>
            </div>
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
                  placeholder="Email"
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
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="field">
              <div className="control">
                <input
                  className="input is-large"
                  type="password"
                  name="password2"
                  value={getPassword2}
                  onChange={e => setPassword2(e.target.value)}
                  placeholder="Verify Password"
                />
              </div>
            </div>

            <button className="button login is-block is-large is-fullwidth">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
