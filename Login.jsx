import React, { useState } from "react";
import { auth, provider } from "./firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ setIsAuth }) {
  let navigate = useNavigate();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    });
  };

  // const signInWithEmailPassword = () => {
  //   signInWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       // Signed in
  //       const user = userCredential.user;
  //       localStorage.setItem("isAuth", true);
  //       setIsAuth(true);
  //       navigate("/");
  //     })
  //     .catch((error) => {
  //       // Handle errors, e.g., display an error message to the user
  //       console.error(error.message);
  //     });
  // };

  return (
    <div className="loginpage">
      <div className="google">
        <p>Sign In with Google to Continue</p>
        <button className="login-with-google-btn" onClick={signInWithGoogle}>
          Sign in With Google
        </button>
      </div>
    </div>
  );
}

export default Login;
