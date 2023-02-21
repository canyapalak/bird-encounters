import { createContext, useEffect, useState } from "react";
import { getToken } from "../utils/getToken";

// create context
export const AuthContext = createContext();

//create the store
export const AuthContextProvider = (props) => {
  const [logInUser, setLogInUser] = useState({});
  const [isToken, setIsToken] = useState();
  const [currentUser, setCurrentUser] = useState({});
  const [isLogInSuccessful, setIsLogInSuccessful] = useState(false);
  const [isEmailWrong, setIsEmailWrong] = useState(false);
  const [isPasswordWrong, setIsPasswordWrong] = useState(false);
  const [loader, setLoader] = useState(true);
  const [getProfileError, setGetProfileError] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  //get profile
  const getProfile = () => {
    const token = getToken();

    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      fetch("http://localhost:5000/api/users/profile", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setUserProfile({
            userName: result.user.userName,
            email: result.user.email,
            userPicture: result.user.userPicture,
            signupTime: result.user.signupTime,
            isAdmin: result.user.isAdmin,
            favs: result.user.favs,
          });
          setGetProfileError(null);
        })
        .catch((error) => console.log("error", error));
    } else {
      console.log("you need to Login first");
      setGetProfileError("you need to Login first");
      setUserProfile(null);
    }
    console.log("userProfile", userProfile);
  };

  //login function

  const handleInputChange = (e) => {
    setLogInUser({
      ...logInUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogIn = () => {
    setIsLogInSuccessful(false);
    setIsEmailWrong(false);
    setIsPasswordWrong(false);

    console.log("loginuser :>> ", logInUser);
    // login(logInUser.email, logInUser.password)
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("email", logInUser.email);
    urlencoded.append("password", logInUser.password);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("http://localhost:5000/api/users/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.token) {
          localStorage.setItem("token", result.token);
          setCurrentUser(result.user);
          setIsLogInSuccessful(true);
        }
        if (result.msg === "email is wrong") {
          setIsEmailWrong(true);
        }
        if (result.msg === "password is wrong") {
          setIsPasswordWrong(true);
        }
      })
      .catch((error) => console.log("error", error));
  };

  //logout function
  function logOut() {
    localStorage.removeItem("token");
  }

  const loaderFunction = () => {
    if (currentUser) {
      setLoader(false);
    } else {
      setLoader(true);
    }
  };

  //use effect and loader
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
    setLoader(false);
  }, []);

  if (loader) {
    return <div>...Page is Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isToken,
        loader,
        logOut,
        handleLogIn,
        handleInputChange,
        isEmailWrong,
        isLogInSuccessful,
        isPasswordWrong,
        getProfile,
        getProfileError,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
