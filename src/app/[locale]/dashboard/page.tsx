import { cookies } from "next/headers";
import LoggedInDashboard from "src/components/LoggedInDashboard";
import Navbar from "src/components/Navbar";
import { IUser, SelectedLanguageElement } from "src/types";

export default async function Dashboard(props: any) {
  const cookieStore = await cookies();
  const cookiesObj = {
    current_user: cookieStore.get("current_user"),
    token: cookieStore.get("token"),
    selectedLanguage: cookieStore.get("selected_language"),
  };

  const currentUser: IUser | undefined =
      cookiesObj.current_user && cookiesObj.current_user.value !== ""
        ? JSON.parse(cookiesObj.current_user.value)
        : undefined,
    selectedLanguage: SelectedLanguageElement | undefined =
      cookiesObj.selectedLanguage && cookiesObj.selectedLanguage.value !== ""
        ? JSON.parse(cookiesObj.selectedLanguage.value)
        : undefined,
    token =
      cookiesObj.token && cookiesObj.token.value !== ""
        ? cookiesObj.token.value
        : undefined;

  const isLoggedIn = currentUser && token ? true : false;

  if (!isLoggedIn) return <div></div>;

  return (
    <>
      <Navbar props={props} />
      <div>
        <LoggedInDashboard
          userId={currentUser!.id}
          userName={currentUser!.name}
          selectedLanguage={selectedLanguage!}
          currentUser={currentUser!}
        />
      </div>
    </>
  );
}
