import React from 'react';
import Headers from './components/Headers';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Auth from './components/Auth';
import MsalHandler from './msal/MsalHandler';

export default function App() {
  const msal = MsalHandler.getInstance();
  var user = msal.getUserData();
  return (
    <Router basename="/msal-axios-intercept">
      <div className="nav-container">
        <nav>
          <div className="left-menu">
            <Link to="/">Home</Link>
            <Link to="/auth">{user.accountAvailable ? "Claims for " + user.displayName : "Login"}</Link>
            <Link to="/headers">API + Headers</Link>
          </div>
          <Link to="/" className="logo">ok</Link>
        </nav>
      </div>
      <div className="container">
        <Switch>
          <Route path="/headers">
            <Headers />
          </Route>
          <Route path="/auth">
            <Auth />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router >

  );
}
function Home() {
  return (
    <div>
      <h1>Home</h1>
      <p>A simple example using msaljs, loginRedirect and state. Use <a href="/auth">Login</a> to login or view your id_token claims. Use <a href="/headers">API + Headers</a> to make an authenticated API call and echo back the headers received by the server.</p>
      <p>Code at <a href="https://github.com/jpda/msaljs-axios-intercept">https://github.com/jpda/msaljs-axios-intercept</a></p>
      </div>
  )
}