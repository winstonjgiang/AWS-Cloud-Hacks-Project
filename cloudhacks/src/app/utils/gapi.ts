// src/app/utils/loadGapiClient.ts
'use client';
import { gapi } from 'gapi-script';

export function loadGapiClient(clientId: string) {
  return new Promise<void>((resolve, reject) => {
    // this will fetch https://apis.google.com/js/api.js for you
    gapi.load('client:auth2', async () => {
      try {
        await gapi.client.init({
          clientId,
          discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
          scope: 'https://www.googleapis.com/auth/calendar',
        });
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  });
}