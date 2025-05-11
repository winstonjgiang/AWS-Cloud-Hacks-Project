'use client';

export default async function loadGapiClient(clientId) {
  if (typeof window === 'undefined') {
    return null;
  }

  const { gapi } = await import('gapi-script');

  await new Promise((resolve, reject) => {
    gapi.load('client:auth2', () => {
      console.log('gapi loaded');
      resolve();
    });
  });

  await gapi.client.init({
    clientId,
    discoveryDocs: [
      'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
    ],
    scope: 'https://www.googleapis.com/auth/calendar.readonly',
  });

  const auth = gapi.auth2.getAuthInstance();

  // Get the current user
  const googleUser = auth.currentUser.get();

  // Get the auth response which contains the access token
  const authResponse = googleUser.getAuthResponse();

  // Extract the access token
  const accessToken = authResponse.access_token;

  if (auth.isSignedIn.get()) {
    console.log('user is signed in');
    console.log('Access Token:', accessToken);

    // You can now use this access token for API calls
    const response = await gapi.client.calendar.events.list({
      calendarId: 'primary',
      singleEvents: true,
      orderBy: 'startTime',
    });

    console.log('Google Access Token:', accessToken);

    return {
      events: response.result.items,
      accessToken: accessToken
    };
  } else {
    console.log('user is not signed in');
    return null;
  }
}