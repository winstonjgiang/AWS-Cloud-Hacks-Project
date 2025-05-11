"use client";

import { useAuth } from "react-oidc-context";
import { useEffect, useState } from "react";
import { userMap, eventMap } from "../utils/userMap";
import { tokenManager } from "../utils/tokenManager";
import ChakraNav from "./ui/ChakraNav";
import loadGapiClient from "../utils/gapi";
import axios from "axios";
import LoginForm from "./components/LoginForm";
import UserDashboard from "./components/UserDashboard";
import { analyzeData } from "../utils/analyzeData";
export default function Dashboard() {
  const auth = useAuth();
  const [categoryData, setCategoryData] = useState(null);


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
        if (!googleResponse) return;

        const { events: fetchedEvents } = googleResponse;

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

        await analyzeData(fetchedEvents, setCategoryData);
      } catch (error) {
        console.error("Failed to initialize dashboard:", error);
      }
    };

    initializeDashboard();
  }, [auth]);

  return (
    <>
      <ChakraNav />

      <div>
        {auth.isAuthenticated ? (
          <UserDashboard categoryData={categoryData} />
        ) : (
          <LoginForm auth={auth}  />
        )}

        <h1>{tokenManager.getToken()}</h1>
      </div>
    </>
  );
}
