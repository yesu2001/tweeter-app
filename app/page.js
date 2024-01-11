import HomaPage from "@/components/home/HomaPage";
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

  return <HomaPage userData={session?.session?.user} />;
}
