import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/profile.css";
import { get_current_user } from "../Utilities/FetchFunction";
import PostsList from "./PostsList";
import EditUser from "./EditUser";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [isEditing, setEditing] = useState(false);
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

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  function handleEdit() {
    setEditing(true);
  }

  return (
    isAuthenticated && (
      <div className="profile">
        <div className="info">
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <div>
            {!isEditing && (
              <button className="editUser m-b" onClick={handleEdit}>
                Edit
              </button>
            )}
          </div>
          <div>{isEditing && <EditUser current={current} />}</div>
        </div>
        <div className="profilePosts">
          <PostsList username={current.Username} />
        </div>
      </div>
    )
  );
};

export default Profile;
