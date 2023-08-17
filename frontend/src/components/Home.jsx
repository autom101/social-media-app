import "./css/Home.css";
import { Routes, Route } from "react-router-dom";
import { Header, PostsList, Post, Sidebar } from "../components";

const Home = () => {
  return (
    <div id="home">
      <Header />
      <Sidebar />
      <div className="view">
        <Routes>
          <Route path="/" element={<PostsList />} />
          <Route path="/:id" element={<Post />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
