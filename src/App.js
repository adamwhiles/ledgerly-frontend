import {BrowserRouter, Route} from "react-router-dom";
import LoginPage from "./components/login";
import MainLedger from "./ledger/ledger";
import "./css/ledger.css";
//import './App.css';

function App() {
  return (
    <>
      <section className="hero is-primary">
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
                  <a
                    href="{{ url_for('main.profile') }}"
                    className="navbar-item"
                  >
                    Profile
                  </a>
                  <a
                    href="{{ url_for('auth.logout') }}"
                    className="navbar-item"
                  >
                    Logout
                  </a>

                  <a href="{{ url_for('auth.login') }}" className="navbar-item">
                    Login
                  </a>
                  <a
                    href="{{ url_for('auth.signup') }}"
                    className="navbar-item"
                  >
                    Sign Up
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </section>

      <section className="is-fullheight has-background-primary">
        <BrowserRouter>
          <div className="content">
            <div>
              <Route path="/" component={LoginPage} exact />
              <Route path="/ledger" component={MainLedger} exact />
            </div>
          </div>
        </BrowserRouter>
      </section>
    </>
  );
}

export default App;
