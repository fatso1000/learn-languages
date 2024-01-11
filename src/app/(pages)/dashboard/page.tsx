"use client";

import LoggedInDashboard from "src/components/LoggedInDashboard";
import useUser from "src/hooks/useUser";

export default function Dashboard(props: any) {
  const { currentUser, isLoggedIn } = useUser(props);

  if (!isLoggedIn || !currentUser) return null;

  return (
    <LoggedInDashboard userId={currentUser.id} userName={currentUser.name} />
  );
}
