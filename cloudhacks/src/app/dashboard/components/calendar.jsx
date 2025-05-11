'use client';

import React, { useState, useEffect } from 'react';
import loadGapiClient from '@/app/utils/gapi';

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function initializeCalendar() {
      try {
        const result = await loadGapiClient(CLIENT_ID);
        if (result) {
          setEvents(result.events);
          setAccessToken(result.accessToken);
          console.log('Google Access Token:', result.accessToken);
        }
      } catch (err) {
        console.error('Failed to initialize calendar:', err);
        setError(err.message || 'Failed to load calendar');
      } finally {
        setLoading(false);
      }
    }

    initializeCalendar();
  }, []);

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