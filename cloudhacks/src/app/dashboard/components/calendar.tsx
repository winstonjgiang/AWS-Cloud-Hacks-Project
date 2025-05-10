// src/app/components/WeekCalendar.tsx
'use client';

import { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';
import { loadGapiClient } from '@/app/utils/gapi';

type GCalEvent = {
  id: string;
  summary?: string;
  start: { dateTime?: string; date?: string };
};

export default function SimpleCalendar() {
  const [events, setEvents]   = useState<GCalEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const CLIENT_ID             = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;

  useEffect(() => {
    (async () => {
      try {
        // 1️⃣ load & init gapi
        await loadGapiClient(CLIENT_ID);

        const auth2 = gapi.auth2.getAuthInstance();
        // 2️⃣ silently sign in (will only show UI if user hasn’t granted calendar scope)
        if (!auth2.isSignedIn.get()) {
          await auth2.signIn({ prompt: 'none' });
        }

        // 3️⃣ fetch next 7 days
        const now    = new Date();
        const timeMin = now.toISOString();
        now.setDate(now.getDate() + 7);
        const timeMax = now.toISOString();

        const resp = await gapi.client.calendar.events.list({
          calendarId: 'primary',
          timeMin,
          timeMax,
          singleEvents: true,
          orderBy: 'startTime',
        });

        setEvents(resp.result.items || []);
      } catch (err) {
        console.error('Calendar load failed', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>Loading calendar…</p>;
  if (!events.length) return <p>No events in the upcoming week.</p>;

  // group by day
  const grouped: Record<string, GCalEvent[]> = {};
  events.forEach(e => {
    const day = (e.start.dateTime || e.start.date)!.slice(0,10);
    (grouped[day] ||= []).push(e);
  });

  // render 7‐column week
  const today = new Date();
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      {Array.from({ length: 7 }).map((_, i) => {
        const day = new Date(today);
        day.setDate(day.getDate() + i);
        const key = day.toISOString().slice(0,10);
        const list = grouped[key] || [];
        return (
          <div key={key} style={{ flex: 1, border: '1px solid #ccc', padding: 8 }}>
            <h4 style={{ fontSize: 14, marginBottom: 4 }}>
              {day.toLocaleDateString(undefined,{weekday:'short',month:'short',day:'numeric'})}
            </h4>
            {list.length ? (
              <ul style={{ padding: 0, listStyle: 'none', margin: 0 }}>
                {list.map(ev => {
                  const time = new Date((ev.start.dateTime||ev.start.date)!).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
                  return <li key={ev.id} style={{ marginBottom: 4 }}>
                    <strong>{time}</strong> {ev.summary}
                  </li>;
                })}
              </ul>
            ) : (
              <p style={{ fontStyle:'italic', color:'#666', fontSize:12 }}>No events</p>
            )}
          </div>
        );
      })}
    </div>
  );
}