import React, {useContext} from "react";
import useAsyncEffect from "use-async-effect";
import {useHistory} from "react-router-dom";
import {UserContext} from "../userContext";
import {Navbar} from "react-bulma-components";

function Header() {
  const history = useHistory();
  const {getUser, setUser} = useContext(UserContext);

  // Check if user is logged in and set our UserContext to the current user id
  useAsyncEffect(async () => {
    const currentUser = await isLoggedIn();
    setUser(currentUser);
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
    <Navbar>
      <Navbar.Menu>
        <Navbar.Container position="end">
          <Navbar.Item onClick={() => history.push("/")}>Home</Navbar.Item>
          {/*
                    Depending on if the user is logged in, show login,logout, profile buttons
                */}
          {getUser ? (
            <>
              <Navbar.Item onClick={() => history.push("/ledger")}>
                Ledger
              </Navbar.Item>
              <Navbar.Item onClick={() => history.push("/profile")}>
                Profile
              </Navbar.Item>
              <Navbar.Item onClick={() => logout()}>Logout</Navbar.Item>
            </>
          ) : (
            <>
              <Navbar.Item onClick={() => history.push("/login")}>
                Login
              </Navbar.Item>
              <Navbar.Item onClick={() => history.push("/signup")}>
                Signup
              </Navbar.Item>
            </>
          )}
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
  );
}

export default Header;
