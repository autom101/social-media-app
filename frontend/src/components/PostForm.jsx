import { InputLabel, FormControl, Input } from "@mui/material";

const PostForm = () => {
  return (
    <>
      <FormControl variant="standard">
        <InputLabel htmlFor="post-title">Title</InputLabel>
        <Input id="post-title" defaultValue="" />
      </FormControl>
    </>
  );
};

export default PostForm;
