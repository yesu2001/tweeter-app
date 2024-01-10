import { cookies } from "next/headers";
import { createClient } from "./supabase/server";
import { redirect } from "next/navigation";

// export async function getUserFromDB(supabase, user) {
//   // console.log("fetching user from DB...");
//   const { data, error } = await supabase
//     .from("profiles")
//     .select()
//     .eq("user_id", user.user.id);

//   if (data.length === 0) {
//     const userData = await SaveUserToDB(supabase, user);
//     // console.log(userData);
//     if (userData) {
//       return userData;
//     }
//   }
//   // console.log("Fetched user from DB");
//   return data[0];
// }

// export async function SaveUserToDB(supabase, user) {
//   console.log("Saving user to DB..");
//   const { data, error } = await supabase
//     .from("profiles")
//     .insert({
//       user_id: user.user.id,
//       user_email: user.user.email,
//       name: "",
//       photo: "",
//     })
//     .select();
//   if (error) {
//     // console.log("something went wrong when saving user to DB", error);
//     throw new Error(
//       "Something went wrong r user already exists in the database",
//       error
//     );
//   }
//   console.log("done saving user to DB : ");
//   return data[0];
// }

export async function checkAuthenticated() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: session } = await supabase.auth.getSession();
  console.log("session", session.session);
  if (!session.session) {
    redirect("/auth");
  }
}

// export async function getUser() {
//   const cookieStore = cookies();
//   const supabase = createClient(cookieStore);
//   const { data: user } = await supabase.auth.getUser();
//   return {
//     userId: user.user.id,
//     userEmail: user.user.email,
//   };
// }

export const signOut = async () => {
  "use server";
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  await supabase.auth.signOut();
  return redirect("/");
};
