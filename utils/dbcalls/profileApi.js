import { cookies } from "next/headers";
import { createClient } from "../supabase/server";
import { redirect } from "next/navigation";

const cookieStore = cookies();
const supabase = createClient(cookieStore);

export const fetchUserfromDB = () => {};

export async function getUserFromDB(user) {
  const { data, error } = await supabase
    .from("profiles")
    .select()
    .eq("id", user.user.id);

  console.log("user data", data);
  console.log("user error", error);
  if (data.length === 0) {
    const userData = await SaveUserToDB(user);
    if (userData) {
      return userData;
    }
  }
  return data[0];
}

export async function SaveUserToDB(user) {
  console.log("Saving user to DB..");
  const { data, error } = await supabase
    .from("profiles")
    .insert({
      id: user.user.id,
      user_email: user.user.email,
      user_name: "",
      bio: "",
      full_name: "",
      following: 0,
      followers: 0,
      user_pic: "",
    })
    .select();
  if (error) {
    throw new Error(
      "Something went wrong or user already exists in the database",
      error
    );
  }
  console.log("done saving user to DB : ");
  return data[0];
}
