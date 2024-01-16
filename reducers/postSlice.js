import {
  addLikeToDB,
  createCommentToDB,
  createNewPost,
  fetchCommentsFromDB,
  fetchPostFromDB,
  retweetPostToDB,
} from "@/utils/dbcalls/postApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// create new post
export const createPost = createAsyncThunk("post/createPost", async (post) => {
  try {
    const { data, error } = await createNewPost(post);
    if (error) {
      console.log("Error while create new post", error);
      throw new Error(error);
    }
    console.log(data);
    if (data.length > 0) {
      return "Tweet Post Created Successfully";
    }
  } catch (error) {
    console.log("Error while creating new post", error);
  }
});

// fetch posts
export const fetchPosts = createAsyncThunk("post/fetchPosts", async () => {
  try {
    const { data, error } = await fetchPostFromDB();
    if (error) {
      console.log("Error while Fetching post", error);
      throw new Error(error);
    }
    return data;
  } catch (error) {
    console.log("Error while Fetching Posts", error);
  }
});

// create a new comment
export const addComment = createAsyncThunk(
  "post/addComment",
  async (comment) => {
    try {
      const { data, error } = await createCommentToDB(comment);
      if (error) {
        console.log("Error while adding new comment", error);
        throw new Error(error);
      }
      if (data.length > 0) {
        return "Commented Created";
      }
    } catch (error) {
      console.log("Error while adding comment", error);
    }
  }
);

// retweet a post
export const retweetPost = createAsyncThunk(
  "post/retweetPost",
  async ({ retweetRef, method }) => {
    try {
      console.log(retweetRef, method);
      const { data, error } = await retweetPostToDB(retweetRef, method);
      if (error) {
        console.log("Error while adding new tweet", error);
        throw new Error(error);
      }
      if (data.length > 0) {
        return "Retweet Created";
      }
    } catch (error) {
      console.log("Error while adding tweet", error);
    }
  }
);

// like a post
export const likePost = createAsyncThunk(
  "post/likePost",
  async ({ likeRef, method }) => {
    try {
      console.log(likeRef, method);
      const { data, error } = await addLikeToDB(likeRef, method);
      if (error) {
        console.log("Error while adding New Like", error);
        throw new Error(error);
      }
      if (data.length > 0) {
        return "Like Created";
      }
    } catch (error) {
      console.log("Error while adding Like", error);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: {
    isLoading: false,
    posts: [],
    error: null,
    message: "",
  },
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(createPost.rejected, (state) => {
        state.isLoading = false;
        state.error = "Something Went Wrong When Creating Post";
      })
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.isLoading = false;
        state.error = "Something Went Wrong When Fetching Post";
      })
      .addCase(addComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(addComment.rejected, (state) => {
        state.isLoading = false;
        state.error = "Something Went Wrong When Commenting";
      })
      .addCase(retweetPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(retweetPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(retweetPost.rejected, (state) => {
        state.isLoading = false;
        state.error = "Something Went Wrong When Retweeting";
      });
  },
});

export default postSlice.reducer;
