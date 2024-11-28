import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  savedArticles: [],
};

const savedSlice = createSlice({
  name: "saved",
  initialState,
  reducers: {
    saveArticle: (state, action) => {
      state.savedArticles.push(action.payload);
    },
    unsaveArticle: (state, action) => {
      state.savedArticles = state.savedArticles.filter(
        (article) => article.url !== action.payload.url
      );
    },
  },
});

export const { saveArticle, unsaveArticle } = savedSlice.actions;
export default savedSlice.reducer;
