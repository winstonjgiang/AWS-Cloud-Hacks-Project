'use client';

import { useAuth } from "react-oidc-context";
import { useEffect, useState } from "react";
import { userMap, eventMap } from "../utils/userMap";
import { tokenManager } from "../utils/tokenManager";
import ChakraNav from "./ui/ChakraNav";
import loadGapiClient from "../utils/gapi";
import axios from "axios";
import LoginForm from "./components/LoginForm";
import UserDashboard from "./components/UserDashboard";
import { invokeBedrockAPI } from "../services/bedrock";
import CategoryPieChart from "./components/CategoryPieChart";

export default function Dashboard() {
  const auth = useAuth();
  const [categoryData, setCategoryData] = useState(null);
  const [events, setEvents] = useState([]);
  const [googleUser, setGoogleUser] = useState(null);

  const analyzeData = async (eventsData) => {
    try {
      const analysis = await invokeBedrockAPI(eventsData);
      if (analysis && Object.keys(analysis).length > 0) {
        const userId = Object.keys(analysis)[0];
        const userData = analysis[userId];
        const chartData = Object.entries(userData)
          .filter(([key]) => key !== 'summary')
          .map(([name, value]) => ({ name, value }));
        setCategoryData(chartData);
      }
    } catch (error) {
      console.error("Error analyzing data:", error);
    }
  };

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
        setEvents(fetchedEvents);
        setGoogleUser(googleResponse.googleUser);
        console.log("Google Response:", googleResponse.googleUser);

        const authenticated = userMap(auth, googleResponse.googleUser);
        await axios.post("/api/user", authenticated);

        const post_events = fetchedEvents.map((event) => {
          const event_promise = eventMap(
            googleResponse.googleUser.googleId,
            event
          );
          return axios.post("/api/events", event_promise);
        });

        const results = await Promise.all(post_events);
        console.log("All events processed:", results);

        // Analyze the events data after processing
        await analyzeData(fetchedEvents);
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
          <UserDashboard />
        ) : (
          <LoginForm auth={auth} />
        )}

        <h1>googleID: {googleUser?.googleId}</h1>

        <h1>{tokenManager.getToken()}</h1>

        {categoryData ? (
          <CategoryPieChart data={categoryData} />
        ) : (
          <div>Loading category data...</div>
        )}
      </div>
    </>
  );
}

