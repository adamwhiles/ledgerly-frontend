import React, {useContext, useState} from "react";
import useAsyncEffect from "use-async-effect";
import {useHistory} from "react-router-dom";
import {UserContext} from "../userContext";

function Profile() {
  const history = useHistory();
  const {getUser, setUser} = useContext(UserContext);
  const [getInfo, setInfo] = useState("");

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
      } else {
        setInfo(res.user_info);
        console.log(res.user_info);
        return res.user; // return the userid from the backend
      }
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
    <div>{getInfo !== null ? <span>Email: {getInfo.Email}</span> : null}</div>
  );
}

export default Profile;
