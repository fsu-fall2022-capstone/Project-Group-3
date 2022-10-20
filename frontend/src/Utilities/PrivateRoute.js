import React, { useContext } from 'react';
import { UserContext } from '..';
import About from '../components/About';

function PrivateRoute({ children }) {
    const {user} = useContext(UserContext)

    return user.isLoggedIn ? children : <About />;
  }

export default PrivateRoute;
