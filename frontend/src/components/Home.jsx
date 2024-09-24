import { Outlet } from "react-router-dom";
import { Header, Navigation } from "../components";

import Grid from "@mui/material/Grid";

const Home = () => {
  return (
    <Grid container maxWidth="lg" mx="auto">
      <Grid item xs={12} sx={{ padding: 0, maxHeight: "fit-content" }}>
        <Header />
      </Grid>
      <Grid item xs={12} md={3}>
        <Navigation />
      </Grid>
      <Grid item xs={12} md={9}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default Home;
