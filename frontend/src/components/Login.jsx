import React from "react";
import { useEffect, useState } from "react";
import { create_user, get_users } from "../Utilities/FetchFunction";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { user, loginWithRedirect } = useAuth0();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    get_users().then((res) => {
      setUsers(res.data);
    });
  }, []);

  if (!!user) {
    let obj = users.find((o) => o.Username === user.email);
    if (!obj) {
      let res = create_user(user);
    }
  }

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;
