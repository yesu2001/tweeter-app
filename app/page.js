import CreatePost from "@/components/home/CreatePost";
import Posts from "@/components/home/Posts";
import Reccomend from "@/components/home/Reccomend";
import Trends from "@/components/home/Trends";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: session } = await supabase.auth.getSession();

  // console.log("session data", session?.session?.user);
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex-1 w-full flex gap-4 mx-4 md:mx-60 my-6">
      <div className="flex-[0.7] space-y-6">
        <CreatePost />
        <Posts />
      </div>
      <div className="hidden md:block flex-[0.3] space-y-6">
        <Trends />
        <Reccomend />
      </div>
    </div>
  );
}
