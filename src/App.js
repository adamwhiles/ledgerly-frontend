import React, {useState} from "react";
import {BrowserRouter, Route} from "react-router-dom";
import LoginPage from "./components/login";
import SignupPage from "./components/signup";
import Profile from "./components/profile";
import Header from "./components/header";
import MainLedger from "./ledger/ledger";
import HomePage from "./home";
import {UserContext} from "./userContext";
import "./css/ledger.css";

function App() {
  const [getUser, setUser] = useState(null);

  return (
    <UserContext.Provider value={{getUser, setUser}}>
      <section className="is-fullheight">
        <BrowserRouter>
          <Header />
          <div className="content">
            <div>
              <Route path="/" component={HomePage} exact />
              <Route path="/login" component={LoginPage} exact />
              <Route path="/signup" component={SignupPage} exact />
              <Route path="/ledger" component={MainLedger} exact />
              <Route path="/profile" component={Profile} exact />
            </div>
          </div>
        </BrowserRouter>
      </section>
    </UserContext.Provider>
  );
}

export default App;
