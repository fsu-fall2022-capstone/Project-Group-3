import React from "react";
import "../styles/post.css";
import user from "../assets/user.png";
import { useEffect, useState } from "react";
import { get_posts } from "../Utilities/FetchFunction";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { delete_post } from "../Utilities/FetchFunction";
import { like } from "../Utilities/FetchFunction";
import { dislike } from "../Utilities/FetchFunction";
import { delete_dislike } from "../Utilities/FetchFunction";
import { delete_like } from "../Utilities/FetchFunction";

function PostsList(props) {
  let [posts, setPosts] = useState([]);
  const [randomNumber, setRandomNumber] = useState(0);
  let inProfile = false;

  useEffect(() => {
    get_posts().then((res) => {
      setPosts(res.data);
      console.log("USE EFFECT");
    });
  }, [randomNumber]);

  if (!!props.username) {
    inProfile = true;
    posts = posts.filter(function(el) {
      return el.Username == props.username;
    });
  }

  const [likeCount, setLikeCount] = useState(50);
  const [dislikeCount, setDislikeCount] = useState(25);
  const [activeBtn, setActiveBtn] = useState("none");

  const handleDelete = (event, postID) => {
    event.preventDefault();
    let request = {
      PostID: postID,
    };
    setRandomNumber(Math.random());
    delete_post(request);
  };

  const handleLikeClick = () => {
    if (activeBtn === "none") {
      let request = {
        like: like,
      };
      like(request);
      setActiveBtn("like");
      return;
    }
    if (activeBtn === "like") {
      let request = {
        like: like,
      };
      delete_like(request);
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
      let request = {
        dislike: dislike,
      };
      dislike(request);
      setActiveBtn("dislike");
      return;
    }
    if (activeBtn === "dislike") {
      let request = {
        dislike: dislike,
      };
      delete_dislike(request);
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
          <div className="highcharts-section" style={{ marginTop: 20 }}>
            <HighchartsReact
              highcharts={Highcharts}
              options={{
                chart: {
                  type: "bar",
                  zoomType: "x",
                },
                title: {
                  text: "",
                },
                xAxis: {
                  title: {
                    text: JSON.parse(post.xData).name
                      ? JSON.parse(post.xData).name
                      : "X-Axis",
                  },
                  minRange: 1,
                  categories: JSON.parse(post.xData).values
                    ? JSON.parse(post.xData).values
                    : [],
                },

                yAxis: {
                  title: {
                    text: JSON.parse(post.yData).name
                      ? JSON.parse(post.yData).name
                      : "Y-Axis",
                  },
                },
                series: [
                  {
                    data: JSON.parse(post.yData).values
                      ? JSON.parse(post.yData).values.map((el) => Number(el))
                      : [],
                  },
                ],
              }}
            />
          </div>
          <div className="download-container">
            <a href={post.File}>
              <button className="download-btn">Download</button>
            </a>
            <div>
              {inProfile && (
                <button
                  className="download-btn deletePost"
                  onClick={(event) => handleDelete(event, post.PostID)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
          <div className="likedislike">
            <div className="btn-container">
              <button
                className={`btn ${activeBtn === "like" ? "like-active" : ""}`}
                onClick={handleLikeClick}
              >
                <AiOutlineLike />
                {post.likes}
              </button>

              <button
                className={`btn ${
                  activeBtn === "dislike" ? "dislike-active" : ""
                }`}
                onClick={handleDisikeClick}
              >
                <AiOutlineDislike />
                {post.dislikes}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostsList;
