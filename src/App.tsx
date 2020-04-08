import React from 'react';
import Headers from './components/Headers';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Auth from './components/Auth';

export default function App() {
  return (
    <Router>
      <div className="nav-container">
        <nav>
          <div className="left-menu">
            <Link to="/">Home</Link>
            <Link to="/auth">Login</Link>
            <Link to="/headers">Headers</Link>
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
  return <h2>Home</h2>
}