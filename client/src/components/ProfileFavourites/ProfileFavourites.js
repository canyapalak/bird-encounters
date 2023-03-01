import "./ProfileFavourites.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../store/AuthContext";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import useConvertDateOnly from "../../hooks/useConvertDateOnly";

function ProfileFavourites() {
  const { userProfile } = useContext(AuthContext);
  const convertDate = useConvertDateOnly();
  const [userFavs, setUserFavs] = useState([]);

  useEffect(() => {
    const favs = userProfile?.favs;

    const fetchPromises = favs?.map((encounterId) => {
      return fetch(`http://localhost:5000/api/encounters/${encounterId}`)
        .then((response) => response.json())
        .then((result) => {
          return result.requestedId;
        });
    });

    Promise.all(fetchPromises).then((results) => {
      setUserFavs(results);
    });
  }, [userProfile.favs]);

  console.log("userFavs :>> ", userFavs);

  return (
    <div className="user-encounters">
      <p id="part-title">favourites</p>
      <span className="encounters-part">
        <span className="encounters-text">
          {userProfile.favs.length === 0 ? (
            <p>You have currently no favourites.</p>
          ) : (
            <p>You have {userFavs.length} favourite(s) so far.</p>
          )}
        </span>
        <span className="encounter-part-card">
          {userFavs &&
            userFavs.map((userFavourite) => {
              return (
                <Link
                  to={`/${userFavourite[0]._id}`}
                  key={userFavourite[0]._id}
                >
                  <Card className="one-user-encounter">
                    <img src={userFavourite[0].image} alt="Encounter Image" />
                    <span className="one-user-encounter-text">
                      <span className="one-user-encounter-title">
                        <p>{userFavourite[0].title.substr(0, 18)}</p>
                        {userFavourite[0].title.length >= 18 && <p>...</p>}
                      </span>
                      <span className="by-and-username">
                        <p id="one-user-encounter-grey">by&nbsp;</p>
                        <p id="blue-text">{userFavourite[0].userName}</p>
                      </span>
                      <span className="by-and-username">
                        <p id="one-user-encounter-grey">on&nbsp;</p>
                        <p id="blue-text">
                          {convertDate(userFavourite[0].posttime)}
                        </p>
                      </span>
                    </span>
                  </Card>
                </Link>
              );
            })}
        </span>
      </span>
    </div>
  );
}

export default ProfileFavourites;
