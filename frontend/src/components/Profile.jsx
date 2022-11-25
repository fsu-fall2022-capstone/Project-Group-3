import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { get_current_user } from "../Utilities/FetchFunction";
import PostsList from "./PostsList";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  const [current, setCurrent] = useState("");
  useEffect(() => {
    async function getCurrent() {
      if (!!user) {
        const response = await get_current_user(user.email);
        setCurrent(response);
      }
    }
    getCurrent().catch(console.error);
  }, [user]);

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <PostsList username={current.Username} />
      </div>
    )
  );
};

export default Profile;
