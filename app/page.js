import CreatePost from "@/components/home/CreatePost";
import Posts from "@/components/home/Posts";
import Reccomend from "@/components/home/Reccomend";
import Trends from "@/components/home/Trends";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default function Home() {
  const cookieStore = cookies();

  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient(cookieStore);
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

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
