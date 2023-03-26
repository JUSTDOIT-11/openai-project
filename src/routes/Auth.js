import React, { useState } from "react";
import { auth } from "fbase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInAnonymously,
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [errMsg, setErrMsg] = useState("");
  //id, password input값과 동기화
  const onChange = (e) => {
    const {
      target: { value, name },
    } = e;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  //로그인, 회원가입 버튼
  const onLoginAndJoinClick = async (e) => {
    const {
      target: { name },
    } = e;

    let data;
    if (name === "join") {
      data = await createUserWithEmailAndPassword(auth, email, password);
    } else if (name === "login") {
      data = await signInWithEmailAndPassword(auth, email, password);
    }
    console.log(data);
  };

  //google 로그인 버튼
  const onGoogleLoginClick = async (e) => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const onGuestLoginClick = () => {
    signInAnonymously(auth)
      .then(() => {
        // Signed in..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
      });
  };

  return (
    <>
      <h1>Login Pages</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={email}
          name="email"
          type="email"
          placeholder="email"
        />
        <input
          onChange={onChange}
          value={password}
          name="password"
          type="password"
          placeholder="password"
        />
        <button onClick={onLoginAndJoinClick} name="login">
          로그인
        </button>
        <button onClick={onLoginAndJoinClick} name="join">
          회원가입
        </button>
      </form>
      <button name="google" onClick={onGoogleLoginClick}>
        Google Login
      </button>
      <button name="guest" onClick={onGuestLoginClick}>
        Guest Login
      </button>
    </>
  );
};

export default Auth;
