import { Routes, Route } from "react-router-dom";
import {
  Header,
  Navigation,
  PostsList,
  MyPosts,
  Settings,
} from "../components";

import Grid from "@mui/material/Grid";

const Home = () => {
  return (
    <Grid container maxWidth="lg" mx="auto">
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={12} md={3}>
        <Navigation />
      </Grid>
      <Grid item xs={12} md={9}>
        <Routes>
          <Route path="/" element={<PostsList />} />
          <Route path="/myposts" element={<MyPosts />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Grid>
    </Grid>
  );
};

export default Home;
