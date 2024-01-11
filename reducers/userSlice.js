import { fetchUserfromDB } from "@/utils/dbcalls/profileApi";
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
      const data = fetchUserfromDB(userId);
      console.log(data);
      return data;
    } catch (error) {
      console.log("Could not fetch user", error);
    }
  }
);

// export const updateUser = createAsyncThunk(
//   "user/updateUser",
//   async ({ userData, userId }) => {
//     try {
//       const data = await updateUserInDB(userData, userId);
//       return data;
//     } catch (error) {
//       console.log("Could not update user", error);
//     }
//   }
// );

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
      });
    //     .addCase(saveUser.fulfilled, (state, action) => {
    //       state.userData = action.payload;
    //     })
    //     .addCase(updateUser.fulfilled, (state, action) => {
    //       state.userData = action.payload;
    //     });
  },
});

export default userSlice.reducer;
