import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { Login, Navigation, Home } from "./components";

/* Contains various routes that load different components based on the url.

When someone visits the page, the home page will load if logged in and the login page if not logged in.*/
const App = () => {
  const user = useSelector((state) => state.user);
  const { isLoggedIn } = user;
  console.log("In App");

  return (
    <Router>
      <Navigation />
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
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
