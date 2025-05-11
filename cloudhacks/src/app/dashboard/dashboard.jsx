'use client';

import { useAuth } from 'react-oidc-context';
import { useEffect, useState } from 'react';
import { userMap } from '../utils/userMap';
import loadGapiClient from '../utils/gapi';
import axios from 'axios';

export default function Dashboard() {
  const auth = useAuth();
  const [events, setEvents] = useState([]);
  const [accessToken, setAccessToken] = useState(null);

  const fetchEvents = async () => {
    try {
      const googleResponse = await loadGapiClient(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
      setEvents((googleResponse && googleResponse.events) || []);
      setAccessToken((googleResponse && googleResponse.accessToken) || null);
      return googleResponse;
    } catch (error) {
      console.error('Failed to fetch events:', error);
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
        console.log('Google Response:', googleResponse.googleUser);
        
        if (googleResponse) {
          const authenticated = userMap(auth, googleResponse.googleUser);
          console.log('Authenticated User:', authenticated);
          await axios.post('/api/create-user', authenticated);
        }
      } catch (error) {
        console.error('Failed to initialize dashboard:', error);
      }
    };

    initializeDashboard();
  }, [auth]);

  return (
    <div>
      {auth.isAuthenticated ? 'Authenticated' : 'Not authenticated'}
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
      <h1>{accessToken}</h1>
      {/* You can render events here if needed */}
    </div>
  );
}