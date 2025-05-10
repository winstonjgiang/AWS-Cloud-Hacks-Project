import { AuthContextProps } from "react-oidc-context";
import { User } from "../models/User";

export const userMap = (auth: AuthContextProps) => {
    if (auth.isAuthenticated && auth.user?.profile.sub && auth.user?.profile.email) {
      const user = {
        userId: auth.user.profile.sub!,
        email: auth.user.profile.email!,
        createdAt: new Date().toISOString(),
        name: auth.user.profile.name || "Unknown",
      };
      return user;
    };
    return null;
  }