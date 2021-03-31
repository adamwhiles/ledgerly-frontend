import React, {useState, useContext} from "react";
import logo from "./img/logo_name.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {Button} from "react-bulma-components";
import {useHistory} from "react-router-dom";

function HomePage() {
  let history = useHistory();
  return (
    <React.Fragment>
      <div className="hero is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <img src={logo} alt="Ledgerly Online" />

            <div>Bringing the checkbook ledger to the digital world.</div>
            <br />
            <div>
              Who uses a checkbook register anymore? Nobody. Let us help you
              track and manage your spending without a complicated app and
              without accessing your banking data. You&apos;re in control.
            </div>
            <div className="has-text-left mainList">
              <FontAwesomeIcon icon={faCheck} className="listIcon" />
              <span className="listText">No Banking Connections</span>
            </div>
            <div className="has-text-left mainList">
              <FontAwesomeIcon icon={faCheck} className="listIcon" />
              <span className="listText">No Tracking or Selling Data</span>
            </div>
            <div className="has-text-left mainList">
              <FontAwesomeIcon icon={faCheck} className="listIcon" />
              <span className="listText">Simple to Use</span>
            </div>
            <div className="has-text-left mainList">
              <FontAwesomeIcon icon={faCheck} className="listIcon" />
              <span className="listText">Free and Open Source</span>
            </div>
            <div className="section">
              <Button className="signupButton">SIGN UP</Button>
              <Button
                className="loginButton"
                onClick={() => history.push("/login")}
              >
                LOGIN
              </Button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default HomePage;
