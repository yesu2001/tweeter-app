import { createClient } from "../supabase/client";

const supabase = createClient();

export async function createNewPost(post) {
  try {
    const { data, error } = await supabase.from("posts").insert(post).select();
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

// fetch All posts
export async function fetchPostFromDB() {
  try {
    const { data, error } = await supabase.from("posts").select();
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

// fetch user posts from DB
export async function fetchUserPostFromDB(userId) {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select()
      .eq("user_id", userId);
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

// add new commetn to DB
export async function createCommentToDB(comment) {
  try {
    const { data, error } = await supabase
      .from("comments")
      .insert(comment)
      .select();

    if (data) {
      await addCommentToPost(data[0]);
    }
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

// Add comment ID to Post table inside comments_array column
async function addCommentToPost(comment) {
  console.log(comment?.post_id);
  try {
    const { data, error: errorOne } = await supabase
      .from("posts")
      .select()
      .eq("id", comment?.post_id);

    const commentArray = data[0];

    const updatedComments = commentArray.comments_array
      ? [...commentArray.comments_array, comment?.comment_id]
      : [comment?.comment_id];

    if (data.length > 0) {
      const { data, error: errorTwo } = await supabase
        .from("posts")
        .update({ comments_array: updatedComments })
        .eq("id", comment?.post_id);
      if (errorTwo) console.log(errorTwo);
    }
  } catch (error) {
    console.log(error);
  }
}

// retweet post to DB
export async function retweetPostToDB(retweetPost, method) {
  console.log(retweetPost, method);
  try {
    if (method === "add") {
      const { data, error } = await supabase
        .from("retweets")
        .insert(retweetPost)
        .select();
      if (error) {
        console.log(error);
        return {
          data: null,
          error: error,
        };
      }
      if (data) {
        await addOrDelRetweetToPost(data[0], method);
      }
      return {
        data,
        errors: null,
      };
    } else {
      const { data, error } = await supabase
        .from("retweets")
        .select()
        .eq("user_id", retweetPost.user_id)
        .eq("post_id", retweetPost.post_id);
      if (error) {
        console.log(error);
      }
      console.log("Retweet", data);
      if (data) {
        await addOrDelRetweetToPost(data[0], method);
      }
      const { error: deleteError } = await supabase
        .from("retweets")
        .delete()
        .eq("retweet_id", data[0].retweet_id);

      if (deleteError) {
        console.log("Error while deleting tweet", deleteError);
      }
    }
  } catch (error) {
    return {
      data: null,
      error: error,
    };
  }
}

// add retweet ID to post data
async function addOrDelRetweetToPost(retweet, method) {
  if (method === "delete") {
    try {
      const { data, error: errorOne } = await supabase
        .from("posts")
        .select()
        .eq("id", retweet?.post_id);

      const retweetsArray = data[0];
      console.log(retweetsArray);

      const updatedComments = retweetsArray.retweets_array?.filter(
        (item) => item.retweet_id !== retweet.retweet_id
      );
      console.log(updatedComments);
      if (data.length > 0) {
        const { error: errorTwo } = await supabase
          .from("posts")
          .update({ retweets_array: updatedComments })
          .eq("id", retweet?.post_id);
        if (errorTwo) console.log(errorTwo);
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const { data, error: errorOne } = await supabase
        .from("posts")
        .select()
        .eq("id", retweet?.post_id);

      const retweetsArray = data[0];

      const updatedComments = retweetsArray.retweets_array
        ? [
            ...retweetsArray.retweets_array,
            { retweet_id: retweet?.retweet_id, user_id: retweet?.user_id },
          ]
        : [{ retweet_id: retweet?.retweet_id, user_id: retweet?.user_id }];

      if (data.length > 0) {
        const { error: errorTwo } = await supabase
          .from("posts")
          .update({ retweets_array: updatedComments })
          .eq("id", retweet?.post_id);
        if (errorTwo) console.log(errorTwo);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

// Fetch All comments from  DB
export async function fetchCommentsFromDB(postID) {
  try {
    const { data, error } = await supabase
      .from("comments")
      .select()
      .eq("post_id", postID);

    if (error) {
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

// // Like a post to DB
export async function addLikeToDB(likeRef, method) {
  console.log(likeRef, method);
  try {
    if (method === "add") {
      const { data, error } = await supabase
        .from("likes")
        .insert(likeRef)
        .select();
      if (error) {
        console.log(error);
        return {
          data: null,
          error: error,
        };
      }
      if (data) {
        console.log(data);
        await addOrDelLikeToPost(data[0], method);
      }
      return {
        data,
        errors: null,
      };
    } else {
      const { data, error } = await supabase
        .from("likes")
        .select()
        .eq("user_id", likeRef.user_id)
        .eq("post_id", likeRef.post_id);
      if (error) {
        console.log(error);
      }
      console.log("Like Data", data);
      if (data) {
        await addOrDelLikeToPost(data[0], method);
      }
      const { error: deleteError } = await supabase
        .from("likes")
        .delete()
        .eq("like_id", data[0].like_id);

      if (deleteError) {
        console.log("Error while deleting tweet", deleteError);
      }
    }
  } catch (error) {
    return {
      data: null,
      error: error,
    };
  }
}

// add and dele like from DB
async function addOrDelLikeToPost(like, method) {
  if (method === "delete") {
    try {
      const { data, error: errorOne } = await supabase
        .from("posts")
        .select()
        .eq("id", like?.post_id);

      const likesArray = data[0];
      console.log(likesArray);

      const updatedLikes = likesArray?.likes_array?.filter(
        (item) => item.like_id !== like?.like_id
      );
      console.log(updatedLikes);
      if (data.length > 0) {
        const { error: errorTwo } = await supabase
          .from("posts")
          .update({ likes_array: updatedLikes })
          .eq("id", like?.post_id);
        if (errorTwo) console.log(errorTwo);
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const { data, error: errorOne } = await supabase
        .from("posts")
        .select()
        .eq("id", like?.post_id);

      const likesArray = data[0];

      const updatedLikes = likesArray?.likes_array
        ? [
            ...likesArray.likes_array,
            { like_id: like?.like_id, user_id: like?.user_id },
          ]
        : [{ like_id: like?.like_id, user_id: like?.user_id }];

      if (data.length > 0) {
        const { error: errorTwo } = await supabase
          .from("posts")
          .update({ likes_array: updatedLikes })
          .eq("id", like?.post_id);
        if (errorTwo) console.log(errorTwo);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export async function savePostToDB(saveRef, method) {
  try {
    if (method === "add") {
      const { data, error } = await supabase
        .from("saves")
        .insert(saveRef)
        .select();
      if (error) {
        return {
          data: null,
          error: error,
        };
      }
      if (data) {
        await addOrDelSavedPost(data[0], method);
      }
      return {
        data,
        errors: null,
      };
    } else {
      const { data, error } = await supabase
        .from("saves")
        .select()
        .eq("user_id", saveRef.user_id)
        .eq("post_id", saveRef.post_id);
      if (error) {
        console.log(error);
      }
      if (data) {
        await addOrDelSavedPost(data[0], method);
      }
      const { error: deleteError } = await supabase
        .from("saves")
        .delete()
        .eq("saved_id", data[0].saved_id);

      if (deleteError) {
        console.log("Error while deleting tweet", deleteError);
      }
    }
  } catch (error) {
    return {
      data: null,
      error: error,
    };
  }
}

// Add or Delete a Saved post from DB
export async function addOrDelSavedPost(saved, method) {
  if (method === "delete") {
    try {
      const { data, error: errorOne } = await supabase
        .from("posts")
        .select()
        .eq("id", saved?.post_id);

      const savedArray = data[0];

      const updatedSaves = savedArray?.saved_array?.filter(
        (item) => item.saved_id !== saved?.saved_id
      );
      if (data.length > 0) {
        const { error: errorTwo } = await supabase
          .from("posts")
          .update({ saved_array: updatedSaves })
          .eq("id", saved?.post_id);
        if (errorTwo) console.log(errorTwo);
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const { data, error: errorOne } = await supabase
        .from("posts")
        .select()
        .eq("id", saved?.post_id);

      const savedArray = data[0];

      const updatedSaves = savedArray?.saved_array
        ? [
            ...savedArray.saved_array,
            { saved_id: saved?.saved_id, user_id: saved?.user_id },
          ]
        : [{ saved_id: saved?.saved_id, user_id: saved?.user_id }];

      if (data.length > 0) {
        const { error: errorTwo } = await supabase
          .from("posts")
          .update({ saved_array: updatedSaves })
          .eq("id", saved?.post_id);
        if (errorTwo) console.log(errorTwo);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

// check post is retweeted by user or not
export async function checkRetweetedByUser(post, userInfo) {
  const { data, error } = await supabase
    .from("retweets")
    .select()
    .eq("user_id", userInfo?.id)
    .eq("post_id", post?.id);

  if (error) {
    console.log("retweet error", error);
    return;
  }
  const retweet = data[0];

  const userRetweetPost = post?.retweets_array?.map((item) =>
    item.user_id === retweet?.user_id && item.retweet_id === retweet?.retweet_id
      ? item
      : null
  );
  if (userRetweetPost?.length > 0) {
    return true;
  }
  return false;
}

// check post is liked by user or not
export async function checkLikedByUser(post, userInfo) {
  const { data, error } = await supabase
    .from("likes")
    .select()
    .eq("user_id", userInfo?.id)
    .eq("post_id", post?.id);

  if (error) {
    console.log("like error", error);
    return;
  }
  const likeData = data[0];

  const userLikedPost = post?.likes_array?.map((item) =>
    item.user_id === likeData?.user_id && item.like_id === likeData?.like_id
      ? item
      : null
  );
  if (userLikedPost?.length > 0) {
    return true;
  }
  return false;
}

// check post is saved by user or not
export async function checkSavedByUser(post, userInfo) {
  const { data, error } = await supabase
    .from("saves")
    .select()
    .eq("user_id", userInfo?.id)
    .eq("post_id", post?.id);

  if (error) {
    console.log("Saved error", error);
    return;
  }

  const savedData = data[0];

  const userSavedPost = post?.saved_array?.map((item) =>
    item.user_id === savedData?.user_id && item.saved_id === savedData?.saved_id
      ? item
      : null
  );
  if (userSavedPost?.length > 0) {
    return true;
  }
  return false;
}

export async function fetchBookmarksFromDB(userId) {
  try {
    const { data: savesData, error: savesError } = await supabase
      .from("saves")
      .select("post_id")
      .eq("user_id", userId);
    if (savesError) {
      return {
        data: null,
        error: savesError,
      };
    }
    console.log(savesData);
    const postsPromises = savesData.map(async (item) => {
      const { data, error } = await supabase
        .from("posts")
        .select()
        .eq("id", item.post_id);

      if (error) {
        console.error(`Error fetching post ${item.post_id}:`, error); // Log error with context
        return null; // Return null to handle errors gracefully
      }

      return data[0];
    });

    const bookMarkedPosts = await Promise.all(postsPromises);
    return {
      data: bookMarkedPosts.filter(Boolean),
      errors: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error,
    };
  }
}
