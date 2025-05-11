// src/utils/userMap.js
 
export function userMap(auth, googleUser = null) {
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
      name:      auth.user.profile.name|| googleUser?.name || auth.user.profile.email,
      googleId:  googleUser?.googleId,
    };
  }
  return null;
}