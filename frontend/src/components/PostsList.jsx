import React from "react";
import "../styles/post.css";
import user from "../assets/user.png";
import { useEffect, useState } from "react";
import { get_posts } from "../Utilities/FetchFunction";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

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
          <div className = "highcharts-section" style={{ marginTop: 20 }}>
                <HighchartsReact highcharts={Highcharts} options={
                  {
        chart: {
          type: 'bar',
          zoomType: "x"

        },
        title:{
          text: ""
        },
        xAxis: {
          title: {
            text: JSON.parse(post.xData).name ? JSON.parse(post.xData).name : "X-Axis",
          },
          minRange: 1,
          categories: JSON.parse(post.xData).values ? JSON.parse(post.xData).values : [],
        },
  
        yAxis: {
          title: {
            text: JSON.parse(post.yData).name ? JSON.parse(post.yData).name : "Y-Axis",
          },
        },
        series: [
          {
            data: JSON.parse(post.yData).values
              ? JSON.parse(post.yData).values.map((el) =>Number(el))
            : [],
        },
        ]
      }} />
              </div>
          <div className="download-container">
          <a href={post.File}>
            <button className="download-btn">Download</button>
          </a>
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
            <div  className="share-icon-collections">
              {/* Facebook */}
              <a href={`https://www.facebook.com/sharer/sharer.php?u=https://github.com/fsu-fall2022-capstone/Project-Group-3"`} target="_blank">
                <svg className="share-icon" xmlns="http://www.w3.org/2000/svg" style={{width:30}} viewBox="0 0 512 512"
                     aria-label="fb" role="img"><path d="m375.14,288l14.22,-92.66l-88.91,0l0,-60.13c0,-25.35 12.42,
                     -50.06 52.24,-50.06l40.42,0l0,-78.89s-36.68,-6.26 -71.75,-6.26c-73.22,0 -121.08,44.38 -121.08,
                     124.72l0,70.62l-81.39,0l0,92.66l81.39,0l0,224l100.17,0l0,-224l74.69,0z"></path></svg>
              </a>

              {/* Twitter */}
              <a href={`https://twitter.com/intent/tweet?url=https://github.com/fsu-fall2022-capstone/Project-Group-3&text=${encodeURI(post.Description)}`}
                 target="_blank">
                <svg className="share-icon" xmlns="http://www.w3.org/2000/svg" style={{width:30}}
                     viewBox="0 0 512 512" aria-label="tw" role="img"><path
                    d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558
                    298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0
                    94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818
                     1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797
                     30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36
                     14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04
                     0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548
                     46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122
                     60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg>
              </a>
              {/* Twitter */}

              {/* Email */}
              <a href={`mailto:info@example.com?&subject=Check out DataTweet!&cc=&bcc=&body=Heres the github link:
              https://github.com/fsu-fall2022-capstone/Project-Group-3 \n\nHeres the post: ${encodeURI(post.Description)}`}
                 target="_blank">
                <svg className="share-icon" xmlns="http://www.w3.org/2000/svg" style={{width:30}} viewBox="0 0 512 512"
                     aria-label="mail" role="img"><path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48
                     48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4
                     56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4
                     56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5
                     9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9
                     40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path></svg>
              </a>
              {/* Email */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostsList;