import { createContext, useEffect, useState } from "react";
import { getToken } from "../utils/getToken";

// create context
export const AuthContext = createContext();

//create the store
export const AuthContextProvider = (props) => {
  const [isToken, setIsToken] = useState();
  const [currentUser, setCurrentUser] = useState(null);

  //logout function
  function logOut() {
    localStorage.removeItem("token");
  }

  // loader
  const [loader, setLoader] = useState(true);

  const loaderFunction = () => {
    if (currentUser) {
      setLoader(false);
    } else {
      setLoader(true);
    }
  };

  useEffect(() => {
    loaderFunction();
    const token = getToken();
    if (token) {
      console.log("LOGGED IN");
      setIsToken(true);
    } else {
      console.log("NOT logged in");
      setIsToken(false);
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, isToken, logOut }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
