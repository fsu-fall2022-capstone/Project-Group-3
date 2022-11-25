import React from "react";
import "../styles/post.css";
import user from "../assets/user.png";
import { useEffect, useState } from "react";
import { get_posts } from "../Utilities/FetchFunction";

function PostsList(props) {
  let [posts, setPosts] = useState([]);

  useEffect(() => {
    get_posts().then((res) => {
      setPosts(res.data);
    });
  }, []);
  if (!!props.username)
    posts = posts.filter(function(el) {
      return el.Username == props.username;
    });

  return (
    <div className="postslist">
      {posts.map((post, key) => (
        <div className="postscard" key={key}>
          <div className="header">
            <img src={user} alt="" className="usericon"></img>
            <div className="header-info">
              {post.FirstName} {post.LastName}{" "}
              <span>
                @{post.Username} . {post.PostedWhen.replace("T", " ")}
              </span>
              <p>{post.Description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostsList;
