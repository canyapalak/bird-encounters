import "./ProfileCard.css";
import { useContext } from "react";
import { AuthContext } from "../../store/AuthContext";
import Card from "react-bootstrap/Card";

function ProfileCard() {
  const { currentUser } = useContext(AuthContext);
  console.log("currentUser :>> ", currentUser);
  return;
}
export default ProfileCard;
