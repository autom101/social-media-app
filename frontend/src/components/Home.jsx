import "./css/Home.css";
import { Routes, Route } from "react-router-dom";
import {
  Header,
  Sidebar,
  PostsList,
  Post,
  MyPosts,
  SavedPosts,
  Settings,
} from "../components";
import { Container } from "@mui/material";

const Home = () => {
  return (
    <Container maxWidth="xl" disableGutters="true">
      <Header />
      <Sidebar />
      <div className="view">
        <Routes>
          <Route path="/" element={<PostsList />} />
          <Route path="/:id" element={<Post />} />
          <Route path="/myposts" element={<MyPosts />} />
          <Route path="/saved" element={<SavedPosts />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Container>
  );
};

export default Home;
