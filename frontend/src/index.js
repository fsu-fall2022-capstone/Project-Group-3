import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import useUser from "./Utilities/useUser";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";

export const fetch_url = "http://127.0.0.1:8000/";

const Routing = () => {
  const { userContext, setUser } = useUser(); // Used when registering and login in so the whole project has access to the userContext

  return (
    <Auth0Provider
      domain="dev-ws6kun7d.us.auth0.com"
      clientId="O8UPE16hieshlepkC9taYRYyjopYiAc6"
      redirectUri={window.location.origin}
    >
      <Router>
        <UserContext.Provider value={{ userContext, setUser }}>
          <Routes>
            <Route path="*" element={<App />}></Route>
          </Routes>
        </UserContext.Provider>
      </Router>
    </Auth0Provider>
  );
};

export const UserContext = createContext();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>
);
