import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Seller from "./seller";
import "./App.css";

function App() {
  return (
    <Router>
      <Seller />
    </Router>
  );
}

export default App;
