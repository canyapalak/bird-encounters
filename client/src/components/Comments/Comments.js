import "./Comments.css";
import useConvertTime from "../../hooks/useConvertTime";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import { getToken } from "../../utils/getToken";
import { useState } from "react";

function Comments({ oneEncounter }) {
  const convertedTime = useConvertTime();
  const { _id } = useParams();
  const [newComment, setNewComment] = useState(null);
  const [isNoToken, setIsNoToken] = useState(null);
  const [isCommentSuccessfull, setIsCommentSuccessfull] = useState(null);
  const [isCommentFail, setIsCommentFail] = useState(null);
  const [isNoText, setIsNoText] = useState(null);

  const handleInputChange = (e) => {
    console.log("e.target.name, e.target.value", e.target.name, e.target.value);
    setNewComment({
      ...newComment,
      [e.target.name]: e.target.value,
    });
  };

  console.log("newComment", newComment);

  function postComment() {
    setIsCommentFail(false);
    setIsCommentSuccessfull(false);
    setIsNoText(false);
    setIsNoText(false);
    setIsNoToken(false);
    const token = getToken();
    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("text", newComment.text);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      fetch(
        `http://localhost:5000/api/encounters/${_id}/comments`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          console.log("result :>> ", result);
          if (result.msg === "comment submitted") {
            setIsCommentSuccessfull(true);
          }
          if (
            newComment.text === null ||
            newComment.text === undefined ||
            newComment.text === ""
          ) {
            setIsNoText(true);
          }
        })
        .catch((error) => console.log("error", error), setIsCommentFail(true));
    } else {
      setIsNoToken(true);
      console.log("no token");
    }
  }

  return (
    <>
      <div className="comments-container">
        {oneEncounter.comments &&
          oneEncounter.comments.map((comment, index) => {
            return (
              <div className="one-comment" key={index}>
                <span className="avatar-username-date">
                  <span className="avatar-username">
                    <img src={comment.authorPicture} alt="Avatar" />
                    <p>{comment.author}</p>
                  </span>
                  <span className="comment-date">
                    <p>{convertedTime(comment.commentTime)}</p>
                  </span>
                </span>
                <span className="comment-test">
                  <p>{comment.text}</p>
                </span>
              </div>
            );
          })}

        {oneEncounter.comments && !oneEncounter.comments.length > 0 && (
          <p id="no-comment">No one has commented yet.</p>
        )}

        <span className="write-comment">
          <textarea
            type="text"
            name="text"
            placeholder="Post a comment..."
            className="signup-input"
            onChange={handleInputChange}
          />
        </span>
        <button id="signup-button" onClick={postComment} disabled={newComment}>
          Post
        </button>
      </div>
    </>
  );
}

export default Comments;
