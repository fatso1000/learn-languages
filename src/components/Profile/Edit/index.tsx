import AnimalComponent from "src/components/Animal";
import { IUser } from "src/types";
import SubmitButton from "src/components/InputsAndButtons/SubmitButton";
import FormInput from "src/components/InputsAndButtons/FormInput";
import FormTextarea from "src/components/InputsAndButtons/FormTextarea";

export default function Edit({
  user,
  handleEditIconMode,
  handleEditMode,
}: {
  user: IUser;
  handleEditIconMode: (stateDefault?: boolean) => void;
  handleEditMode: (stateDefault?: boolean) => void;
}) {
  return (
    <div className="flex flex-col h-full justify-around">
      <div className="flex flex-col items-center  gap-4 py-2">
        <div className="relative">
          <AnimalComponent
            color={user.profile.color}
            animalName={user.profile.animal_name}
            size="6em"
          />
          <button
            type="button"
            className="w-8 h-8 bg-base-100 shadow absolute right-0 bottom-0 rounded-[2rem] flex items-center justify-center"
            onClick={() => handleEditIconMode()}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
              <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="h-full overflow-y-auto flex flex-col gap-2 my-4">
        <FormInput
          label="Name"
          name="name"
          type="text"
          defaultValue={user.name}
        />
        <FormTextarea
          label="Biography"
          name="biography"
          maxLength={75}
          defaultValue={user.biography}
        />
        <FormInput
          label="Ubication"
          name="ubication"
          type="text"
          defaultValue={user.ubication}
        />
        <input
          type="text"
          name="id"
          defaultValue={user.id}
          className="invisible h-0 w-0 radio-input p-0 m-0"
        />
      </div>
      <div className="flex max-md:flex-col-reverse gap-2 w-full justify-between">
        <button
          className="btn btn-error font-black flex-1"
          onClick={() => {
            handleEditMode(false);
            handleEditIconMode(false);
          }}
        >
          Cancel
        </button>
        <SubmitButton className="btn btn-success font-black flex-1">
          Save
        </SubmitButton>
      </div>
    </div>
  );
}
