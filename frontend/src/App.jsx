import "./App.css";
import "./reset.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { Login, Home } from "./components";

/* Contains various routes that load different components based on the url.

When someone visits the page, the home page will load if logged in and the login page if not logged in.*/
const App = () => {
  const user = useSelector((state) => state.user);
  const { isLoggedIn } = user;

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/home" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/home/*" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
