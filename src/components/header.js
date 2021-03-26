import React, {useContext} from "react";
import useAsyncEffect from "use-async-effect";
import {useHistory} from "react-router-dom";
import {UserContext} from "../userContext";

function Header() {
  const history = useHistory();
  const {getUser, setUser} = useContext(UserContext);

  // Check if user is logged in and set our UserContext to the current user id
  useAsyncEffect(async () => {
    if (await isLoggedIn()) {
      setUser(isLoggedIn());
    }
  }, []);

  // Our reusable isLoggedIn method that calls the backend to check for the current
  // user. If not logged in, redirect to homepage
  const isLoggedIn = async () => {
    try {
      const ledger = await fetch("/api/isLoggedIn");
      const res = await ledger.json();
      if (res.user === null) {
        history.push("/"); // redirect because user is not logged in
      }
      return res.user; // return the userid from the backend
    } catch (err) {
      console.log(err);
      return "failed";
    }
  };

  // Logout method to call backend and kill the user session
  const logout = async () => {
    try {
      const ledger = await fetch("/api/logout");
      const res = await ledger.json();
      setUser(null); // set our userContext to null in React
      history.push("/"); // Redirect to homepage since the user is logged out
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="hero header">
      <div className="hero-head">
        <nav className="navbar">
          <div className="container">
            <div id="navbarMenuHeroA" className="navbar-menu">
              <div className="navbar-end">
                <a href="{{ url_for('main.index') }}" className="navbar-item">
                  Home
                </a>

                <a
                  href="{{ url_for('ledger.getLedger') }}"
                  className="navbar-item"
                >
                  Ledger
                </a>
                {/*
                    Depending on if the user is logged in, show login,logout, profile buttons
                */}
                {getUser ? (
                  <>
                    <a
                      href="{{ url_for('main.profile') }}"
                      className="navbar-item"
                    >
                      Profile
                    </a>
                    <a
                      href="#"
                      onClick={() => logout()}
                      className="navbar-item"
                    >
                      Logout
                    </a>
                  </>
                ) : (
                  <>
                    <a
                      href="{{ url_for('auth.login') }}"
                      className="navbar-item"
                    >
                      Login
                    </a>
                    <a
                      href="{{ url_for('auth.signup') }}"
                      className="navbar-item"
                    >
                      Sign Up
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
}

export default Header;
