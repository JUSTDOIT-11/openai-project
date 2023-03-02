import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navi from "./Navi";
import Pages from "routes/Pages";
import Chat from "routes/Chat";
import Home from "routes/Home";
import Auth from "routes/Auth";

const AppRouter = ({ userObj }) => {
  return (
    <Router>
      {userObj && <Navi />}
      <Routes>
        {userObj ? (
          <>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/pages" element={<Pages />} />
            <Route exact path="/chat" element={<Chat />} />
          </>
        ) : (
          <Route exact path="/" element={<Auth />} />
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
