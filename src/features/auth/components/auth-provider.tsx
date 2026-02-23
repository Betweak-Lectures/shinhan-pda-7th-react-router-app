// src/features/auth/components/auth-provider.tsx

import { createContext, useEffect, useState, type ReactNode } from "react";
import type {
  AuthUser,
  LoginPayload,
  LoginResponseData,
  SignupPayload,
  SignupResponseData,
} from "../types";
import { fetchMe, loginServer, logoutServer, signupServer } from "../apis";
import type { ApiEnvelope } from "@/types/api-envelope";
import {
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from "@/lib/auth-token-storage";

export interface AuthContext {
  user: AuthUser | null;
  login: (payload: LoginPayload) => Promise<ApiEnvelope<LoginResponseData>>;
  signup: (payload: SignupPayload) => Promise<ApiEnvelope<SignupResponseData>>;
  logout: () => Promise<ApiEnvelope<{ message: string }>>;
}

export const authContext = createContext<AuthContext>({
  user: null,
  login: async (payload: LoginPayload) => {
    return loginServer(payload);
  },
  signup: async (payload: SignupPayload) => {
    return signupServer(payload);
  },
  logout: async () => {
    return logoutServer();
  },
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  // 요청1.
  useEffect(() => {
    fetchMe().then((result) => {
      if (result.success) {
        setUser(result.data.user);
      }
    });
  }, []);

  // // 요청 없이
  // useEffect(() => {
  //   const token = getAccessToken();
  //   if (token) {
  //     console.log(atob(token.split(".")[1]));
  //     const user = JSON.parse(atob(token.split(".")[1])) as AuthUser;
  //     // eslint-disable-next-line react-hooks/set-state-in-effect
  //     setUser(user);
  //   }
  // }, []);

  // login
  const login = async (payload: LoginPayload) => {
    const data = await loginServer(payload);
    if (data.success) {
      setAccessToken(data.data.token);
      setUser(data.data.user);
    }
    return data;
  };

  const signup = async (payload: SignupPayload) => {
    const data = await signupServer(payload);
    if (data.success) {
      setAccessToken(data.data.token);
      setUser(data.data.user);
    }
    return data;
  };

  const logout = async () => {
    clearAccessToken();
    setUser(null);
    return await logoutServer();
  };

  return (
    <authContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </authContext.Provider>
  );
}
