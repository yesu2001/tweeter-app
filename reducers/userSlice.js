import { fetchUserfromDB, updateUserInDB } from "@/utils/dbcalls/profileApi";
import { createClient } from "@/utils/supabase/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// export const saveUser = createAsyncThunk("user/saveUser", async ({ user }) => {
//   try {
//     const supabase = createClient();
//     const { data, error } = await supabase
//       .from("profiles")
//       .select()
//       .eq("user_id", user.user_id);
//     if (error) {
//       throw new Error("Something went wrong when fetching the user", error);
//     }
//     return data[0];
//   } catch (error) {
//     console.log(error);
//   }
// });

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async ({ userId }) => {
    try {
      const data = await fetchUserfromDB(userId);
      return data;
    } catch (error) {
      console.log("Could not fetch user", error);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ userData }) => {
    try {
      await updateUserInDB(userData);
      // console.log(data);
      // return data;
    } catch (error) {
      console.log("Could not update user", error);
    }
  }
);

export const signOutUser = createAsyncThunk("user/signOutUser", async () => {
  try {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    console.log(error);
  } catch (error) {
    console.log("Could not sign out user", error);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    userData: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isLoading = false;
        state.error = "something went wrong when fetching user";
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.userData = action.payload;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
        state.error = "Something went wrong when updating the user profile";
      })
      .addCase(signOutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.userData = null;
      })
      .addCase(signOutUser.rejected, (state) => {
        state.isLoading = false;
        state.error = "Something went wrong when updating the user profile";
      });
    //     .addCase(saveUser.fulfilled, (state, action) => {
    //       state.userData = action.payload;
    //     })
  },
});

export default userSlice.reducer;
