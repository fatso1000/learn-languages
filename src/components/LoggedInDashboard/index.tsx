import { DashboardProps, IUser, SelectedLanguageElement } from "src/types";
import { getDashboardData } from "src/queryFn";
import Header from "./DashboardContent";
import { cookies } from "next/headers";

export default async function LoggedInDashboard(props: {
  userId: number;
  userName: string;
  selectedLanguage: SelectedLanguageElement;
  currentUser: IUser;
}) {
  const cookieStore = cookies();
  const tokenCookie = cookieStore.get("token"),
    token = tokenCookie && tokenCookie.value ? tokenCookie.value : undefined;

  if (!token) return <div>Not token</div>;

  const request = await getDashboardData<DashboardProps>(props.userId, token);
  if (!request.data) return <div>No data</div>;

  return (
    <main className="mt-4 px-4 md:px-8">
      <Header
        data={request.data}
        userName={props.userName}
        selectedLanguage={props.selectedLanguage}
        currentUser={props.currentUser}
      />
    </main>
  );
}
