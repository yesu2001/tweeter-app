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

  const filters = ["top", "latest", "people", "media"];
  return (
    <div className="flex-1 w-full flex flex-col md:flex-row gap-8 mx-4 md:mx-60 my-6">
      <div className="flex-[0.3]">
        <Filters filters={filters} defaultFilter={"top"} />
      </div>
      <div className="flex-[0.7] flex flex-col space-y-4">
        <Search />
        <Posts />
      </div>
    </div>
  );
}
