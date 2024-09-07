import { Box, Button, FormControl, TextField, Typography } from "@mui/material";

const PostForm = () => {
  return (
    <Box
      component="form"
      sx={{
        m: 1,
        p: 2,
        borderRadius: "2rem",
        backgroundColor: "background.post",
      }}
    >
      <Typography variant="h4" component="p">
        Create Post
      </Typography>
      <FormControl variant="standard" fullWidth sx={{ mt: 2 }}>
        <TextField
          helperText="Please provide a post title"
          label="Title"
          id="form-post-title"
          fullWidth
        />
      </FormControl>
      <FormControl variant="standard" fullWidth sx={{ mt: 2 }}>
        <TextField
          helperText="Please provide post content"
          label="Content"
          id="form-post-content"
          fullWidth
        />
      </FormControl>
      <Button
        variant="contained"
        color="success"
        sx={{ display: "block", ml: "auto", width: "7rem" }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default PostForm;
