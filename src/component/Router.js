import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navi from "./Navi";
import Auth from "routes/Auth";
import Chat from "routes/Chat";

const AppRouter = () => {
  return (
    <Router>
      <Navi />
      <Routes>
        <Route exact path="/Auth" element={<Auth />} />
      </Routes>
      <Routes>
        <Route exact path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
