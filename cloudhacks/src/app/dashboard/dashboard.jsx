'use client';

import { useAuth } from 'react-oidc-context';
import { useEffect, useState } from 'react';
import { userMap } from '../utils/userMap';
import loadGapiClient from '../utils/gapi';
import axios from 'axios';
import { testBedrockAPI } from '../services/bedrock';
import CategoryPieChart from './components/CategoryPieChart';

export default function Dashboard() {
  const auth = useAuth();
  const [events, setEvents] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const [categoryData, setCategoryData] = useState(null);

  const fetchEvents = async () => {
    const result = await loadGapiClient(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
    setEvents((result && result.events) || []);
    setAccessToken((result && result.accessToken) || null);
    return result;
  };

  useEffect(() => {
    if (!auth || !auth.isAuthenticated) {
      return;
    }
    const authenticated = userMap(auth);
    if (authenticated) {
      axios.post('/api/create-user', authenticated);
      fetchEvents().then(async (result) => {
        if (result && result.events) {
          try {
            const analysis = await testBedrockAPI(result.events);
            if (analysis && Object.keys(analysis).length > 0) {
              const userId = Object.keys(analysis)[0];
              const userData = analysis[userId];
              const chartData = Object.entries(userData)
                .filter(([key]) => key !== 'summary')
                .map(([name, value]) => ({ name, value }));
              setCategoryData(chartData);
            }
          } catch (error) {
            console.error("Error analyzing events:", error);
          }
        }
      });
    }
  }, [auth]);

  return (
    <div className="p-4">
      {auth.isAuthenticated ? 'Authenticated' : 'Not authenticated'}
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
      {categoryData ? (
        <CategoryPieChart data={categoryData} />
      ) : (
        <div>Loading category data...</div>
      )}
    </div>
  );
}