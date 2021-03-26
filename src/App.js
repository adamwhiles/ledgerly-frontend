import React, {useState} from "react";
import {BrowserRouter, Route} from "react-router-dom";
import LoginPage from "./components/login";
import Header from "./components/header";
import MainLedger from "./ledger/ledger";
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
              <Route path="/" component={LoginPage} exact />
              <Route path="/ledger" component={MainLedger} exact />
            </div>
          </div>
        </BrowserRouter>
      </section>
    </UserContext.Provider>
  );
}

export default App;
