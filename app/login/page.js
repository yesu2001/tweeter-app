import Link from "next/link";
import { headers, cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getUserFromDB } from "@/utils/dbcalls/profileApi";

export default function Login({ searchParams }) {
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
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/login?message=Check email to continue sign in process");
  };

  return (
    <div className="flex flex-col items-center w-full px-8 sm:max-w-md my-32 mx-auto justify-center gap-2 ">
      {/* <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link> */}

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
