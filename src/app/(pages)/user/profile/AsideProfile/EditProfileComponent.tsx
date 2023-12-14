import AnimalComponent from "src/components/Animal";
import GenericInput from "src/components/InputsAndButtons/GenericInput";
import GenericTextarea from "src/components/InputsAndButtons/GenericTextarea";
import { editUserProfile } from "src/queryFn";
import { setLoginCookies } from "src/shared/apiShared";
import { IUser } from "src/types";

export default function EditProfileComponent({
  user,
  closeEditMode,
}: {
  user: IUser;
  closeEditMode: () => void;
}) {
  const submitForm = async (formData: FormData) => {
    "use server";

    const name = formData.get("name"),
      bio = formData.get("bio"),
      email = formData.get("email"),
      password =
        formData.get("password") === formData.get("confirm-password")
          ? formData.get("password")
          : null;

    const user = await editUserProfile({ name, bio, email, password });

    if (!user.error) {
      setLoginCookies(JSON.stringify(user.data.user), user.data.token);
    }
  };

  return (
    <form action={submitForm} className="flex flex-col h-full">
      <div className="flex flex-col items-center gap-4 py-2">
        <div className="relative">
          <AnimalComponent
            color={user.profile.color}
            animalName={user.profile.animal_name}
            size="6em"
          />
          <button className="w-8 h-8 bg-[#ffffff] absolute right-0 bottom-0 rounded-[2rem] flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
              <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="h-full overflow-y-auto flex flex-col gap-2 my-4">
        <GenericInput
          label="Name"
          name="name"
          inputType="text"
          defaultValue={user.name}
        />
        <GenericTextarea label="Bio" name="bio" maxLength={50} />
        <GenericInput label="Ubication" name="ubication" inputType="text" />
        <GenericInput
          label="Email"
          name="email"
          inputType="email"
          defaultValue={user.email}
        />
        <GenericInput label="Password" name="passwod" inputType="password" />
        <GenericInput
          label="Confirm Password"
          name="confirm-password"
          inputType="password"
        />
      </div>
      <div className="flex gap-2 w-full justify-between">
        <button
          className="btn bg-[#e3d7cf] hover:bg-[#d9c8bc] border-0 w-[45%]"
          onClick={closeEditMode}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn bg-[#a2d5cf] hover:bg-[#80bdb6] border-0 w-[45%]"
        >
          Save
        </button>
        {/*<button className="btn btn-error hover:bg-[#f65c5c] w-[90%] text-neutral-50 border-0">
            Delete Account
        </button> */}
      </div>
    </form>
  );
}
