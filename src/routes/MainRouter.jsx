import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// import PrivateRoute from "../components/PrivateRoute";
// import AdminRoute from "../components/AdminRoute";

// screens
import App from "../App";

const MainRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* public routes */}
      {/* Registered users */}
      {/* Admin users */}
      {/* 404 fallback (must be last) */}
      <Route path="*" element={<h1 style={{ padding: 16 }}>Not found</h1>} />
    </Route>
  )
);

export default MainRouter;
