import {redirect} from "next/navigation";
import {signupUser} from "src/queryFn";
export default function SignUp({
  searchParams,
}: {
  searchParams: {error?: string};
}) {
  const hasError = searchParams?.error;
  const submitForm = async (formData: FormData) => {
    "use server";
    const name = formData.get("name"),
      email = formData.get("email"),
      password = formData.get("password"),
      repeat_password = formData.get("repeat_password");

    if (password === repeat_password) {
      const user = await signupUser({email, password, name});
      redirect(user.error ? `?error=${user.error}` : "/auth/signin");
    } else {
      redirect("?error=RepeatedPasswordIsDifferent");
    }
  };
  return (
    <main className="mt-4 px-4 sm:px-4 md:px-16">
      <section className="flex flex-col gap-y-5 max-w-[50ch] m-auto">
        <h1 className="font-black text-6xl text-center">SignUp User</h1>
        <form
          action={submitForm}
          className="flex flex-col items-center gap-y-5">
          {hasError && (
            <div className="card w-96 bg-red-600 text-white">
              <div className="card-body items-center text-center">
                <h2 className="card-title">ERROR!</h2>
                <p>{hasError}</p>
              </div>
            </div>
          )}
          <div className="form-control w-full">
            <label className="label p-0 px-4">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Your name"
              name="name"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label p-0 px-4">
              <span className="label-text">
                Email<span className="label-text-alt text-[red]">*</span>
              </span>
              {/* <span className="label-text-alt text-[red]">
                This email is already exists.
              </span> */}
            </label>
            <input
              type="email"
              required
              placeholder="Your email"
              name="email"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label p-0 px-4">
              <span className="label-text">
                Password<span className="label-text-alt text-[red]">*</span>
              </span>
              {/* <span className="label-text-alt text-[red]">
                This password is already exists.
              </span> */}
            </label>
            <input
              type="password"
              required
              placeholder="Your password"
              name="password"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label p-0 px-4">
              <span className="label-text">
                Repeat password
                <span className="label-text-alt text-[red]">*</span>
              </span>
              {hasError === "RepeatedPasswordIsDifferent" && (
                <span className="label-text-alt text-[red]">
                  This password is incorrect.
                </span>
              )}
            </label>
            <input
              type="password"
              required
              placeholder="Repeat your password"
              name="repeat_password"
              className="input input-bordered w-full"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </form>
      </section>
    </main>
  );
}
