import './App.css';
import Dashboard from "./page/Dashboard";
import { Route, Routes } from "react-router-dom";
import Recruit from "./page/Recruit";
import BlogAdd from "./page/BlogAdd"
import Blogs from "./page/Blogs";
import Company from "./page/Company";
import RecruitDetail from "./page/RecruitDetail";
import SignIn from "./page/SignIn";
import CompanyDetail from "./page/CompanyDetail";
import CompanyRecruits from "./page/CompanyRecruits";
import CompanyBlogs from "./page/CompanyBlogs";

import CssBaseline from "@mui/material/CssBaseline";
import AppTheme from "./shared-theme/AppTheme";
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from './dashboard/theme/customizations';
import TopNavBar from './commons/components/TopNavBar';
import OAuth2Redirect from './page/OAuth2Redirect';
import RecruitSubscription from './page/RecruitSubscription';
import Copyright from './dashboard/internals/components/Copyright';
import Contact from './dashboard/internals/components/Contact';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

function App() {
  return (
    <AppTheme themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <TopNavBar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/recruit" element={<Recruit />}></Route>
          <Route path="/recruit/:id" element={<RecruitDetail />}></Route>
          <Route path="/company" element={<Company />}></Route>
          <Route path="/company/:companyName" element={<CompanyDetail />}></Route>
          <Route path="/:companyName/recruits" element={<CompanyRecruits />}></Route>
          <Route path="/:companyName/blogs" element={<CompanyBlogs />}></Route>
          <Route path="/blog" element={<Blogs />}></Route>
          <Route path="/add/tech-blog" element={<BlogAdd />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/oauth2/redirect" element={<OAuth2Redirect />}></Route>
          <Route path="/profile/recruit" element={<RecruitSubscription />}></Route>
        </Routes>
      </div>
      <Copyright />
      <Contact />
    </AppTheme>
  );
}

export default App;
