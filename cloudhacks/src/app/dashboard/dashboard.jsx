"use client";

import { useAuth } from "react-oidc-context";
import { useEffect, useState } from "react";
import { userMap, eventMap } from "../utils/userMap";
import ChakraNav from "./ui/ChakraNav";
import loadGapiClient from "../utils/gapi";
import axios from "axios";
import LoginForm from "./components/LoginForm";
import UserDashboard from "./components/UserDashboard";
import { analyzeData } from "../utils/analyzeData";
import { Card } from "@chakra-ui/react";

export default function Dashboard() {
  const auth = useAuth();
  const [categoryData, setCategoryData] = useState(null);
  const [googleUser, setGoogleUser] = useState(null);
  const [recurringEvents, setRecurringEvents] = useState(null);
  const [summary, setSummary] = useState(null);
  const [page, setPage] = useState("home");

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
    console.log("CATEGORY DATA:", categoryData);
  }, [categoryData]);

  useEffect(() => {
    console.log("RECURRING EVENTS:", recurringEvents);
  }, [recurringEvents]);

  useEffect(() => {
    const initializeDashboard = async () => {
      if (!auth || !auth.isAuthenticated) {
        return;
      }

      try {
        const googleResponse = await fetchEvents();
        if (!googleResponse) return;

        const { googleUser, events: fetchedEvents } = googleResponse;
        setGoogleUser(googleUser);

        const authenticated = userMap(auth, googleResponse.googleUser);
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

        if (!existingUser.data.exists) {
          await axios.post("/api/user", authenticated);
        }

        if (!existingUser.data.exists) {
          const post_events = fetchedEvents.map((event) => {
            const event_promise = eventMap(
              googleResponse.googleUser.googleId,
              event
            );
            return axios.post("/api/events", event_promise);
          });
          const results = await Promise.all(post_events);
          console.log("All events processed:", results);
        }
        await analyzeData(fetchedEvents, googleUser, setCategoryData, setSummary, setRecurringEvents);
        setPage("dashboard");

      } catch (error) {
        console.error("Failed to initialize dashboard:", error);
      }
    };

    initializeDashboard();
  }, [auth]);

  return (
    <>
      <ChakraNav auth={auth} page={page} setPage={setPage} />

      <div>
        {page === "home" && <LoginForm auth={auth} page={page} setPage={setPage} />}
        {page === "dashboard" && (
          auth.isAuthenticated
            ? <UserDashboard 
                categoryData={categoryData} 
                summary={summary} 
                recurringEvents={recurringEvents} 
              />
            : <LoginForm auth={auth} page={page} setPage={setPage} />
        )}
      </div>
    </>
  );
}
