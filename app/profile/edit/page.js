import EditProfile from "@/components/editProfile/EditProfile";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import React from "react";
import { redirect } from "next/navigation";

export default async function page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: session } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }
  return (
    <div className="flex w-full h-full m-8">
      <EditProfile user={session?.session?.user} />
    </div>
  );
}
