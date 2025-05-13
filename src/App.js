import * as React from "react"

import './App.css';
import Dashboard from "./page/Dashboard";
import { Route, Routes } from "react-router-dom";
import Recruit from "./page/Recruit";
import BlogAdd from "./page/BlogAdd"
import Blogs from "./page/Blogs";
import Company from "./page/Company";
import CompanyTable from "./dashboard/components/CompanyTable";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/recruit" element={<Recruit />}></Route>
        <Route path="/company" element={<Company />}></Route>
        <Route path="/blog" element={<Blogs />}></Route>
        <Route path="/add/tech-blog" element={<BlogAdd />}></Route>
      </Routes>
    </div>
  );
}

export default App;
