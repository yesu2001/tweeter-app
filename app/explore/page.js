import ExplorePage from "@/components/explore/ExplorePage";
import Filters from "@/components/explore/Filters";
import Search from "@/components/explore/Search";
import Posts from "@/components/home/Posts";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Explore() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: session } = await supabase.auth.getSession();
  const user = session?.session?.user;

  return <ExplorePage userData={user} />;
}
