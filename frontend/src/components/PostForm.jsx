import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useField } from "../hooks";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "../reducers/postReducer";

const PostForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const title = useField("");
  const content = useField("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      addNewPost(user, { title: title.value, content: content.value })
    );
    title.clear();
    content.clear();
    handleClose();
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="contained"
        color="success"
        sx={{
          mt: "0.5rem",
        }}
        size="large"
        endIcon={<ChevronRightIcon />}
      >
        Create Post
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          component="form"
          sx={{
            p: 2,
            width: "50%",
            borderRadius: "2rem",
            backgroundColor: "background.postForm",
          }}
          onSubmit={handleSubmit}
        >
          <Typography variant="h4" component="p">
            Create Post
          </Typography>
          <FormControl variant="standard" fullWidth sx={{ mt: 2 }}>
            <TextField
              helperText="Please provide a post title"
              label="Title"
              id="form-post-title"
              value={title.value}
              onChange={title.onChange}
              fullWidth
            />
          </FormControl>
          <FormControl variant="standard" fullWidth sx={{ mt: 2 }}>
            <TextField
              helperText="Please provide post content"
              label="Content"
              id="form-post-content"
              value={content.value}
              onChange={content.onChange}
              fullWidth
            />
          </FormControl>
          <Button
            variant="contained"
            sx={{
              display: "block",
              ml: "auto",
              width: "7rem",
              backgroundColor: "#06D6A0",
            }}
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default PostForm;
