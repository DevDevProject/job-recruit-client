import * as React from "react"

import './App.css';
import Dashboard from "./page/Dashboard";
import { Route, Routes } from "react-router-dom";
import Recruit from "./page/Recruit";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/recruit" element={<Recruit />}></Route>
        <Route path="/company" element={<Dashboard />}></Route>
      </Routes>
    </div>
  );
}

export default App;
