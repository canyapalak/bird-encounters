import "./ProfileFavourites.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../store/AuthContext";
import { Link } from "react-router-dom";
import useConvertDateOnly from "../../hooks/useConvertDateOnly";
import { getToken } from "../../utils/getToken";
import { serverURL } from "../../utils/serverURL";

function ProfileFavourites() {
  const { userProfile } = useContext(AuthContext);
  const convertDate = useConvertDateOnly();
  const [userFavs, setUserFavs] = useState([]);

  useEffect(() => {
    fetchFavsByUserId();
  }, []);

  const fetchFavsByUserId = async () => {
    const userIdToUse = userProfile._id;
    const token = getToken();

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    const urlencoded = new URLSearchParams();

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      //   body: urlencoded,
      redirect: "follow",
    };

    try {
      fetch(`${serverURL}/api/encounters/favs/${userIdToUse}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          // console.log("result :>> ", result);
          setUserFavs(result.requestedFavs);
        })
        .catch((error) => console.log("error", error));
    } catch (error) {
      // console.log(error);
    }
  };

  // console.log("userFavs :>> ", userFavs);

  return (
    <div className="user-encounters">
      <p id="part-title">favourites</p>
      <span className="encounters-part">
        <span className="encounters-text">
          {userFavs?.length === 0 ? (
            <p>You have no favourites.</p>
          ) : (
            <p>You have {userFavs?.length} favourite(s).</p>
          )}
        </span>
        <span className="encounter-part-card">
          {userFavs &&
            userFavs.map((userFavourite) => {
              return (
                <Link to={`/${userFavourite._id}`} key={userFavourite._id}>
                  <div className="round-card-and-text">
                    <img
                      src={userFavourite.image}
                      alt={userFavourite.species}
                    />

                    <p>{userFavourite.species}</p>
                  </div>
                </Link>
              );
            })}
        </span>
      </span>
    </div>
  );
}

export default ProfileFavourites;
