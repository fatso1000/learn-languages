import Navbar from "src/components/Navbar";
import ProfileForm from "src/components/Form/ProfileForm";

export default function UserProfile(props: any) {
  return (
    <>
      <Navbar props={props} />
      <div className="flex w-full">
        <ProfileForm props={props} />
      </div>
    </>
  );
}
