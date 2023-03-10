import "./ProfileEncounters.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../store/AuthContext";
import { Link } from "react-router-dom";
import useConvertDateOnly from "../../hooks/useConvertDateOnly";
import { serverURL } from "../../utils/serverURL.js";

function ProfileEncounters() {
  const { userProfile } = useContext(AuthContext);
  const [encountersByUserName, setEncountersByUserName] = useState(null);
  const convertDate = useConvertDateOnly();

  useEffect(() => {
    fetchEncounterByUserName();
  }, []);

  //fetch user encounters
  const fetchEncounterByUserName = async () => {
    const userNameToUse = userProfile.userName;
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${serverURL}/encounters/by/${userNameToUse}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        // console.log(result);
        setEncountersByUserName(result.requestedEncounters);
      })

      .catch((error) => console.log("error", error));
  };

  return (
    <div className="user-encounters">
      <p id="part-title">encounters</p>
      <span className="encounters-part">
        <span className="encounters-text">
          {!encountersByUserName ? (
            <p>You have no encounters.</p>
          ) : (
            <p>You have {encountersByUserName?.length} encounter(s).</p>
          )}
        </span>
        <span className="encounter-part-card">
          {encountersByUserName &&
            encountersByUserName.map((userEncounter) => {
              return (
                <Link to={`/${userEncounter._id}`} key={userEncounter._id}>
                  <div className="round-card-and-text">
                    <img
                      src={userEncounter.image}
                      alt={userEncounter.species}
                    />

                    <p>{userEncounter.species}</p>
                  </div>
                </Link>
              );
            })}
        </span>
      </span>
    </div>
  );
}

export default ProfileEncounters;
