import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// import PrivateRoute from "../components/PrivateRoute";
// import AdminRoute from "../components/AdminRoute";

// screens
import App from "../App";
import Home from "../pages/exams/Home";
import SignUp from "../pages/auth/SignUp";
import SignIn from "../pages/auth/SignIn";
import Profile from "../pages/auth/Profile";
import Exams from "../pages/exams/Exams";
import Subjects from "../pages/exams/Subjects";
import Chapters from "../pages/exams/Chapters";
import Videos from "../pages/exams/Videos";
import Player from "../pages/exams/Player";
import Admin from "../pages/admin/Admin";

const MainRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* public routes */}
      <Route path="/" index element={<Home />} />
      <Route path="/signup" index element={<SignUp />} />
      <Route path="/signin" index element={<SignIn />} />
      <Route path="/exams" index element={<Exams />} />
      <Route path="/subjects" index element={<Subjects />} />
      <Route path="/signin" index element={<Chapters />} />
      <Route path="/signin" index element={<Videos />} />

      {/* Registered users */}
      <Route path="/me" index element={<Profile />} />
      <Route path="/me" index element={<Player />} />

      {/* Admin users */}
      <Route path="/me" index element={<Admin />} />

      {/* 404 fallback (must be last) */}
      <Route path="*" element={<h1 style={{ padding: 16 }}>Not found</h1>} />
    </Route>
  )
);

export default MainRouter;
