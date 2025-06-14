import * as React from "react"
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import './App.css';
import Dashboard from "./page/Dashboard";
import { Route, Routes } from "react-router-dom";
import Recruit from "./page/Recruit";
import BlogAdd from "./page/BlogAdd"
import Blogs from "./page/Blogs";
import Company from "./page/Company";
import CompanyTable from "./dashboard/components/CompanyTable";
import RecruitDetail from "./page/RecruitDetail";
// import SignIn from "./page/SignIn";
import CompanyDetail from "./page/CompanyDetail";

function App() {
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/recruit" element={<Recruit />}></Route>
          <Route path="/recruit/:id" element={<RecruitDetail />}></Route>
          <Route path="/company" element={<Company />}></Route>
          <Route path="/company/:id" element={<CompanyDetail />}></Route>
          <Route path="/blog" element={<Blogs />}></Route>
          <Route path="/add/tech-blog" element={<BlogAdd />}></Route>
          {/* <Route path="/signin" element={<SignIn />}></Route> */}
        </Routes>
      </div>
    
  );
}

export default App;
