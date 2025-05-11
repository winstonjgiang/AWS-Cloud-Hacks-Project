'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from "react-oidc-context";
import loadGapiClient from '@/app/utils/gapi';

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;

export default function Calendar() {
  const auth = useAuth();
  const [events, setEvents] = useState<any[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeCalendar = async () => {
      // Only proceed if user is authenticated with Cognito
      if (!auth.isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        const result = await loadGapiClient(CLIENT_ID);
        if (result) {
          setEvents(result.events);
          setAccessToken(result.accessToken);
          console.log('Google Access Token:', result.accessToken);
        }
      } catch (err: any) {
        console.error('Failed to initialize calendar:', err);
        setError(err.message || 'Failed to load calendar');
      } finally {
        setLoading(false);
      }
    };

    initializeCalendar();
  }, [auth.isAuthenticated]);

  if (!auth.isAuthenticated) {
    return (
      <div className="p-4">
        <button
          onClick={() => auth.signinRedirect()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Sign in with Cognito
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600">
        {error}
      </div>
    );
  }

  if (!events.length) {
    return (
      <div className="p-4 text-gray-600">
        No upcoming events found
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
      <ul className="space-y-4">
        {events.map(ev => (
          <li 
            key={ev.id}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <strong className="font-semibold">{ev.summary || '(no title)'}</strong>
            <div className="text-sm text-gray-600">
              {new Date(ev.start.dateTime || ev.start.date).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
} 