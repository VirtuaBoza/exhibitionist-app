import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import "./App.css";
import logo from "./logo.svg";

function App() {
  const { loginWithRedirect, isAuthenticated, logout, isLoading } = useAuth0();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {!isLoading &&
          (isAuthenticated ? (
            <button onClick={() => logout()}>Log Out</button>
          ) : (
            <button onClick={() => loginWithRedirect()}>Log In</button>
          ))}
      </header>
    </div>
  );
}

export default App;
