import { createNewPost, fetchPostFromDB } from "@/utils/dbcalls/postApi";
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
      });
  },
});

export default postSlice.reducer;
