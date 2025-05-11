'use client';

export default async function loadGapiClient(clientId: string) {
  if (typeof window === 'undefined') {
    return null;
  }
  const { gapi } = await import('gapi-script');

  await new Promise<void>((resolve, reject) => {
    gapi.load('client:auth2', () => {
      console.log('gapi loaded');
      resolve();
    });
  });

  await gapi.client.init({
    clientId,
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
    scope: 'https://www.googleapis.com/auth/calendar.readonly',
  });

  const auth = await gapi.auth2.getAuthInstance();
  
  // Check if user is signed in
  if (!auth.isSignedIn.get()) {
    // If not signed in, trigger sign-in
    try {
      await auth.signIn({
        prompt: 'consent',
        scope: 'https://www.googleapis.com/auth/calendar.readonly'
      });
    } catch (error) {
      console.error('Failed to sign in to Google:', error);
      return null;
    }
  }

  // Get the current user
  const googleUser = auth.currentUser.get();
  
  // Get the auth response which contains the access token
  const authResponse = googleUser.getAuthResponse();
  
  // Extract the access token
  const accessToken = authResponse.access_token;
  
  console.log('Access Token:', accessToken);
  
  try {
    // Fetch calendar events
    const response = await gapi.client.calendar.events.list({
      calendarId: 'primary',
      singleEvents: true,
      orderBy: 'startTime',
    });

    return {
      events: response.result.items,
      accessToken: accessToken
    };
  } catch (error) {
    console.error('Failed to fetch calendar events:', error);
    return null;
  }
} 