import BookmarksPage from "@/components/bookmarks/BookmarksPage";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Bookmarks() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: session } = await supabase.auth.getSession();

  // console.log("session data", session?.session?.user);
  if (!session) {
    redirect("/login");
  }
  return <BookmarksPage userData={session?.session?.user} />;
}
