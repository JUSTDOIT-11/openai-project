import React from "react";
import { auth } from "fbase";

const Home = () => {
  const onClick = () => {
    auth.signOut();
  };
  return (
    <>
      <h1>home</h1>
      <button onClick={onClick}>๋ก๊ทธ์์</button>
    </>
  );
};

export default Home;
