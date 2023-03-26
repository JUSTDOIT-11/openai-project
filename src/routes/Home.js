import React from "react";
import { auth } from "fbase";

const Home = ({ userObj }) => {
  //로그아웃 버튼
  const onLogoutClick = () => {
    auth.signOut();
  };

  return (
    <>
      {userObj.isAnonymous ? (
        <h1>
          <i>Guest</i> 님 환영합니다.
        </h1>
      ) : (
        <h1>
          <i>{userObj.displayName}</i> 님 환영합니다.
        </h1>
      )}
      <button onClick={onLogoutClick}>로그아웃</button>
    </>
  );
};

export default Home;
