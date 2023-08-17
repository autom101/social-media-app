import "./css/Home.css";
import { Routes, Route } from "react-router-dom";
import { Header, PostsList, Sidebar } from "../components";
const Home = () => {
  return (
    <div id="home">
      <Header />
      <Sidebar />
      <Routes>
        <Route path="/" element={<PostsList />} />
      </Routes>
    </div>
  );
};

export default Home;
