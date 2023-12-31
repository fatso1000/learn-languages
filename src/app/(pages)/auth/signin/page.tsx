import { signinUser } from "src/queryFn";
import { setLoginCookies } from "src/shared/apiShared";

export default function SignIn({ searchParams }: any) {
  const hasError = searchParams.hasOwnProperty("error")
    ? searchParams["error"]
    : undefined;

  const submitForm = async (formData: FormData) => {
    "use server";
    const { redirect } = require("next/navigation");

    const email = formData.get("email"),
      password = formData.get("password");
    const user = await signinUser({ email, password });

    if (!user.error)
      setLoginCookies(JSON.stringify(user.data.user), user.data.token);

    redirect(user.error ? `?error=${user.error}` : "/");
  };

  return (
    <main className="mt-4 px-4 sm:px-4 md:px-16">
      <section className="flex flex-col gap-y-5 max-w-[50ch] m-auto">
        <h1 className="font-black text-6xl text-center">SignIn User</h1>
        <form
          action={submitForm}
          className="flex flex-col items-center gap-y-5"
        >
          {hasError && (
            <div className="card w-96 bg-red-600 text-white">
              <div className="card-body items-center text-center">
                <h2 className="card-title">ERROR!</h2>
                <p>{hasError}</p>
              </div>
            </div>
          )}
          <input
            type="text"
            required
            placeholder="Email"
            name="email"
            className="input input-bordered w-full"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            className="input input-bordered w-full"
          />
          <button type="submit" className="btn btn-primary">
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}
