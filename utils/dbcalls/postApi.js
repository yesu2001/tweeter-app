import { createClient } from "../supabase/client";

const supabase = createClient();

export async function createNewPost(post) {
  try {
    const { data, error } = await supabase.from("posts").insert(post).select();
    console.log(data);
    if (error) {
      console.log(error);
      return {
        data: null,
        error: error,
      };
    }
    return {
      data,
      errors: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error,
    };
  }
}

export async function fetchPostFromDB() {
  try {
    const { data, error } = await supabase.from("posts").select();
    console.log(data);
    if (error) {
      console.log(error);
      return {
        data: null,
        error: error,
      };
    }
    return {
      data,
      errors: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error,
    };
  }
}
