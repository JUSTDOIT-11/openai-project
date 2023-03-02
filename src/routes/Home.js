import React from "react";
import { auth } from "fbase";

const Home = () => {
  const onClick = () => {
    auth.signOut();
  };
  return (
    <>
      <h1>home</h1>
      <button onClick={onClick}>로그아웃</button>
    </>
  );
};

export default Home;
