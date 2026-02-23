// src/features/auth/hooks.ts

import { useContext } from "react";
import { authContext } from "./components/auth-provider";

export function useAuth() {
  return useContext(authContext);
}
