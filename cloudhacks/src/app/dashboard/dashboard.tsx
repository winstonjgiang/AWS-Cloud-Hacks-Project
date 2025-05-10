"use client";

import { useAuth } from "react-oidc-context";
import { useEffect } from "react";
import { userMap } from "../utils/userMap";
import axios from "axios";
import SimpleCalendar from "./components/calendar";
function Dashboard() {
  const auth = useAuth();

  useEffect(() => {
    const authenticated = userMap(auth);
    if(authenticated) {
      axios.post("/api/create-user", authenticated)
    }
  }, [auth.isAuthenticated, auth.user]);

  return (
    <div>
      {auth.isAuthenticated ? "Authenticated" : "Not authenticated"}
      <button onClick={() => auth.signinRedirect()} >Sign in</button>
      <SimpleCalendar />
    </div>
  )
}


export default Dashboard;