"use client";

import { useAuth } from "react-oidc-context";
import { useEffect, useState } from "react";
import { userMap, eventMap } from "../utils/dbPrepMap";
import ChakraNav from "./ui/ChakraNav";
import loadGapiClient from "../utils/gapi";
import axios from "axios";
import LoginForm from "./components/LoginForm";
import UserDashboard from "./components/UserDashboard";
import { analyzeData } from "../utils/analyzeData";

export default function Dashboard() {
  const auth = useAuth();
  const [categoryData, setCategoryData] = useState(null);
  const [recurringEvents, setRecurringEvents] = useState(null);
  const [summary, setSummary] = useState(null);
  const [page, setPage] = useState("home");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [aiTips, setAiTips] = useState(null);

  const fetchEvents = async () => {
    try {
      const googleResponse = await loadGapiClient(
        process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
      );
      return googleResponse;
    } catch (error) {
      console.error("Failed to fetch events:", error);
      return null;
    }
  };

  useEffect(() => {
    const initializeDashboard = async () => {
      if (!auth || !auth.isAuthenticated) {
        return;
      }

      try {
        const googleResponse = await fetchEvents();
        if (!googleResponse) return; //If no google response, return
        const { googleUser, events: fetchedEvents } = googleResponse;

        const authenticated = userMap(auth, googleResponse.googleUser);
        setPage("dashboard"); //Change component to dashboard once authenticated

        if (!authenticated) {
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }

        let existingUser = false;
        try {
          existingUser = await axios.get("/api/user", {
            params: {
              userId: authenticated.userId,
            },
          });
        } catch (error) {
          console.error("Failed to fetch user:", error);
        }

        /*If user does not exist, create user and post events to database */
        if (!existingUser.data.exists) {
          await axios.post("/api/user", authenticated); //Create user in database
          const post_events = fetchedEvents.map(async (event) => {
            const event_promise = eventMap(
              googleResponse.googleUser.googleId,
              event
            );
            return axios.post("/api/events", event_promise);
          });
          await Promise.all(post_events); //await all events to be posted to database
        }

        await analyzeData(
          fetchedEvents,
          googleUser,
          setCategoryData,
          setSummary,
          setRecurringEvents,
          setAiTips
        );
      } catch (error) {
        console.error("Failed to initialize dashboard:", error);
      }
    };
    initializeDashboard();
  }, [auth]); //Run initializeDashboard when auth changes

  return (
    <>
      <ChakraNav
        auth={auth}
        page={page}
        setPage={setPage}
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />

      <div className={page === "home" ? "overflow-hidden" : "overflow-auto"}>
        {page === "home" && (
          <LoginForm auth={auth} page={page} setPage={setPage} />
        )}
        {page === "dashboard" &&
          (auth.isAuthenticated ? (
            <UserDashboard
              categoryData={categoryData}
              summary={summary}
              recurringEvents={recurringEvents}
              aiTips={aiTips}
            />
          ) : (
            <LoginForm
              auth={auth}
              isAuthenticated={isAuthenticated}
              page={page}
              setPage={setPage}
            />
          ))}
      </div>
    </>
  );
}
