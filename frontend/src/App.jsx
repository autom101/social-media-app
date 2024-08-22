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
import { ThemeProvider } from "@mui/material";
import theme from "./utils/theme";
import { PostsList, MyPosts, Settings } from "./components";
/* Contains various routes that load different components based on the url.

When someone visits the page, the home page will load if logged in and the login page if not logged in.*/
const App = () => {
  const user = useSelector((state) => state.user);
  const { isLoggedIn } = user;

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />}
          >
            <Route index element={<PostsList />} />
            <Route path="myposts" element={<MyPosts />} />
            <Route path="settings" element={<Settings />} />
          </Route>
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
