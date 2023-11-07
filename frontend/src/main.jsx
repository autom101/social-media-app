import React from "react";
import ReactDOM from "react-dom/client";
// redux imports
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userReducer from "./reducers/userReducer.js";
import postReducer from "./reducers/postReducer.js";

//
import App from "./App.jsx";

const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
