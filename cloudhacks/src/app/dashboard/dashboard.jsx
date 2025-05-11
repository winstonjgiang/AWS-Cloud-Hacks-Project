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
    const result = await loadGapiClient(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
    setEvents((result && result.events) || []);
    setAccessToken((result && result.accessToken) || null);
  };

  useEffect(() => {
    if (!auth || !auth.isAuthenticated) {
      return;
    }
    const authenticated = userMap(auth);
    if (authenticated) {
      axios.post('/api/create-user', authenticated);
      fetchEvents();
    }
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