import React from "react";
import "../styles/post.css";
import user from "../assets/user.png";
import { useEffect, useState } from "react";
import { get_posts } from "../Utilities/FetchFunction";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

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

  const [likeCount, setLikeCount] = useState(50);
  const [dislikeCount, setDislikeCount] = useState(25);

  const [activeBtn, setActiveBtn] = useState("none");
  const handleLikeClick = () => {
    if (activeBtn === "none") {
      setLikeCount(likeCount + 1);
      setActiveBtn("like");
      return;
    }

    if (activeBtn === "like") {
      setLikeCount(likeCount - 1);
      setActiveBtn("none");
      return;
    }

    if (activeBtn === "dislike") {
      setLikeCount(likeCount + 1);
      setDislikeCount(dislikeCount - 1);
      setActiveBtn("like");
    }
  };
  const handleDisikeClick = () => {
    if (activeBtn === "none") {
      setDislikeCount(dislikeCount + 1);
      setActiveBtn("dislike");
      return;
    }

    if (activeBtn === "dislike") {
      setDislikeCount(dislikeCount - 1);
      setActiveBtn("none");
      return;
    }

    if (activeBtn === "like") {
      setDislikeCount(dislikeCount + 1);
      setLikeCount(likeCount - 1);
      setActiveBtn("dislike");
    }
  };
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
          <div className="likedislike">
            <div className="btn-container">
              <button
                className={`btn ${activeBtn === "like" ? "like-active" : ""}`}
                onClick={handleLikeClick}
              >
                <AiOutlineLike />
                {likeCount}
              </button>

              <button
                className={`btn ${
                  activeBtn === "dislike" ? "dislike-active" : ""
                }`}
                onClick={handleDisikeClick}
              >
                <AiOutlineDislike />
                {dislikeCount}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostsList;
