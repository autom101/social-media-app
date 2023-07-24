import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./components";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<p>Hello, World</p>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
