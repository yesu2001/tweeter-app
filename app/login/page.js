import Link from "next/link";
import { headers, cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getUserFromDB } from "@/utils/dbcalls/profileApi";

export default async function Login({ searchParams }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: session } = await supabase.auth.getSession();

  console.log(session);

  if (session?.session) {
    redirect("/");
  }
  const isCheckEmail =
    searchParams.message === "Check email to continue sign in process";
  const signIn = async (formData) => {
    "use server";

    const email = formData.get("email");
    const password = formData.get("password");
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    const { data: user } = await supabase.auth.getUser();
    console.log(user);
    const userData = await getUserFromDB(user);
    console.log(userData);

    if (userData) {
      return redirect("/");
    }
  };

  const signUp = async (formData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email");
    const password = formData.get("password");
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/login`,
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/login?message=Check email to continue sign in process");
  };

  return (
    <div className="flex flex-col items-center w-full px-8 sm:max-w-md my-32 mx-auto justify-center gap-2 ">
      <form
        className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground bg-white p-6 rounded-lg"
        action={signIn}
      >
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border border-blue-400 mb-6 outline-none"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border border-blue-400 mb-6 outline-none"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <button className="bg-[#2F80ED] text-white rounded-md px-4 py-2 text-foreground mb-2 font-semibold">
          Sign In
        </button>
        <button
          formAction={signUp}
          className="border-2 border-[#2F80ED] text-[#2F80ED] font-bold rounded-md px-4 py-2 text-foreground mb-2"
        >
          Sign Up
        </button>
        {searchParams?.message && (
          <p
            className={`mt-4 p-2 bg-accent rounded-md ${
              isCheckEmail ? "text-green-700" : "text-red-700"
            } font-semibold text-center`}
          >
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}
