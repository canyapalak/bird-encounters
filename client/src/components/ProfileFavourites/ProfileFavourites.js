import "./ProfileFavourites.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../store/AuthContext";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import useConvertDateOnly from "../../hooks/useConvertDateOnly";

// function ProfileFavourites() {
//   const { userProfile } = useContext(AuthContext);
//   const [encountersByUserName, setEncountersByUserName] = useState(null);
//   const convertDate = useConvertDateOnly();

//   useEffect(() => {
//   }, []);

//   return (
//     <div className="user-encounters">
//       <p id="part-title">encounters</p>
//       <span className="encounters-part">
//         <span className="encounters-text">
//           {userProfile.favs.length === 0 ? (
//             <p>You have currently no favourites.</p>
//           ) : (
//             <p>
//               You have {userProfile.favs.length} favourite(s) so far.
//             </p>
//           )}
//         </span>
//         <span className="encounter-part-card">
//           {userProfile.favs &&
//             userProfile.favs.map((userFavourite) => {
//               return (
//                 <Link to={`/${userEncounter._id}`} key={userEncounter._id}>
//                   <Card className="one-user-encounter">
//                     <img src={userEncounter.image} alt="Encounter Image" />
//                     <span className="one-user-encounter-text">
//                       <span className="one-user-encounter-title">
//                         <p>{userEncounter.title.substr(0, 18)}</p>
//                         {userEncounter.title.length >= 18 && <p>...</p>}
//                       </span>
//                       <span className="by-and-username">
//                         <p id="one-user-encounter-grey">by&nbsp;</p>
//                         <p id="blue-text">{userEncounter.userName}</p>
//                       </span>
//                       <span className="by-and-username">
//                         <p id="one-user-encounter-grey">on&nbsp;</p>
//                         <p id="blue-text">
//                           {convertDate(userEncounter.posttime)}
//                         </p>
//                       </span>
//                     </span>
//                   </Card>
//                 </Link>
//               );
//             })}
//         </span>
//       </span>
//     </div>
//   );
// }

export default ProfileFavourites;
