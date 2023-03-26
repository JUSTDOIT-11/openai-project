import React, { useState, useEffect } from "react";
import AppRouter from "./Router";
import { auth } from "fbase";
import { onAuthStateChanged } from "firebase/auth";
import "CSS/App.css";

function App() {
  const [waiting, setWating] = useState(false); //로그인 유무를 확인하는 동안 기다림..
  const [userObj, setUserObj] = useState(null);

  useEffect((user) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserObj(user);
        console.log(user, user.isAnonymous);
      } else {
        setUserObj(null);
      }
      setWating(true); //user확인 후 라우터 출력
    });
  }, []);

  return <>{waiting ? <AppRouter userObj={userObj} /> : <h1>waiting...</h1>}</>;
}

export default App;
