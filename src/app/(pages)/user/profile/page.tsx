import Navbar from "src/components/Navbar";
import ProfileForm from "src/components/Form/ProfileForm";

export default function UserProfile(props: any) {
  return (
    <>
      <Navbar props={props} />
      <div>
        <div className="flex w-full h-full items-center justify-center my-5">
          <ProfileForm props={props} />
        </div>
      </div>
    </>
  );
}
