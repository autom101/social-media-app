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
import { Container, Grid } from "@mui/material";

const Home = () => {
  return (
    <Container maxWidth="xl" disableGutters>
      <Grid container spacing="2">
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12} md={3}>
          <Sidebar />
        </Grid>
        <Grid item xs={12} md={9}>
          <Routes>
            <Route path="/" element={<PostsList />} />
            <Route path="/:id" element={<Post />} />
            <Route path="/myposts" element={<MyPosts />} />
            <Route path="/saved" element={<SavedPosts />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
