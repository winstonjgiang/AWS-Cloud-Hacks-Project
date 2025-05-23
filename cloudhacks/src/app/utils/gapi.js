"use client";
import { oneWeekBefore, today } from "./time";
async function loadGapiClient(clientId) {
  if (typeof window === "undefined") {
    return null;
  }

  const { gapi } = await import("gapi-script");

  await new Promise((resolve, reject) => {
    gapi.load("client:auth2", () => {
      resolve();
    });
  });

  await gapi.client.init({
    clientId,
    discoveryDocs: [
      "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
    ],
    scope: "https://www.googleapis.com/auth/calendar.readonly",
  });

  const auth = gapi.auth2.getAuthInstance();

  // Get the current user
  const googleUser = auth.currentUser.get();
  const googleUserInfo = googleUser.getBasicProfile();

  const userInfo = {
    googleId: googleUserInfo.getId(),
    email: googleUserInfo.getEmail(),
    name: googleUserInfo.getName(),
  };

  // Get the auth response which contains the access token
  const authResponse = googleUser.getAuthResponse();

  // Extract the access token
  const accessToken = authResponse.access_token;

  if (auth.isSignedIn.get()) {
    // Use this access token for API calls
    const response = await gapi.client.calendar.events.list({
      calendarId: "primary",
      singleEvents: true,
      orderBy: "startTime",
      // timeMin: oneWeekBefore(), //change after demo
      timeMin: "2025-05-03T22:25:27.803Z",
      timeMax: today(),
      // timeMax: "2025-05-11T22:25:27.803Z",
    });

    return {
      googleUser: userInfo,
      events: response.result.items,
      accessToken: accessToken,
    };
  } else {
    return null;
  }
}

export default loadGapiClient;
