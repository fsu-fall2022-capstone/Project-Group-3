import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import useUser from './Utilities/useUser';
import App from './App';
import { Routes, BrowserRouter as Router, Route} from 'react-router-dom';


export const fetch_url = 'http://127.0.0.1:8000/'

const Routing = () => {
  
  const { user, setUser } = useUser()      // Used when registering and login in so the whole project has access to the user

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="*" element={ <App /> }></Route>
        </Routes>

      </UserContext.Provider>
    </Router>
  )
}

export const UserContext = createContext()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>
);