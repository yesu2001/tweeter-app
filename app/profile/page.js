import React from "react";
import Profile from "@/components/profile/Profile";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export default async function page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: session } = await supabase.auth.getSession();
  const user = session?.session?.user;

  const { data, error } = await supabase
    .from("profiles")
    .select()
    .eq("id", user?.id);
  const isOwnProfile = user?.id === data[0]?.id;
  return <Profile user={user} isOwnProfile={isOwnProfile} />;
}
