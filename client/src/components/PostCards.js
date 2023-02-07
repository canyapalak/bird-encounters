import "../components/styles/PostCards.css";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import SmallLogo from "../components/assets/small-logo.png";

function PostCards() {
  const [posts, setPosts] = useState();
  const [error, setError] = useState();

  const fetchAllPosts = async () => {
    try {
      const urlAllPosts = "http://localhost:5000/api/posts/all";
      const response = await fetch(urlAllPosts);
      const results = await response.json();
      console.log("results :>> ", results.allPosts);

      setPosts(results.allPosts);
    } catch (error) {
      console.log("error", error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  return (
    <div className="cards-container">
      <img src={SmallLogo} alt="Logo" id="small-logo" />
      {posts &&
        posts.map((post, index) => {
          return (
            <div className="one-card" key={index}>
              <Card style={{ width: "40rem" }} className="post-card">
                <Card.Header>
                  <p>{post.title}</p>
                  <p>{post.username}</p>
                </Card.Header>
                <Card.Body>
                  <span className="card-img">
                    <img src={post.image} />
                  </span>
                </Card.Body>
              </Card>
            </div>
          );
        })}
    </div>
  );
}

export default PostCards;
