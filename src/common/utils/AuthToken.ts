import { createContext } from "react";

export const AuthToken = createContext({
  accessToken: "",
  setAccessToken: (token: string) => {},
});
