// src/utils/userMap.js

export function userMap(auth) {
  if (
    auth.isAuthenticated &&
    auth.user &&
    auth.user.profile &&
    auth.user.profile.sub &&
    auth.user.profile.email
  ) {
    return {
      userId:    auth.user.profile.sub,
      email:     auth.user.profile.email,
      createdAt: new Date().toISOString(),
      name:      auth.user.profile.name || 'Unknown',
    };
  }
  return null;
}