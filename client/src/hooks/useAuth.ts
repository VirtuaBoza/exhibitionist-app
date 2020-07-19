import jwtDecode from "jwt-decode";
import { useCallback, useMemo } from "react";
import { atom, useRecoilState } from "recoil";
import { proxyUrl } from "../environment";
import useOrg from "./useOrg";

export const key = "tokenState";

export const tokenState = atom({
  key,
  default: localStorage.getItem(key),
});

const isAuthenticatingState = atom({
  key: "isAuthenticatingState",
  default: false,
});

const authenticationErrorState = atom({
  key: "authenticationErrorState",
  default: "",
});

export interface Credentials {
  email: string;
  password: string;
}

export interface Auth {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  authenticationError: string;
  token: string | null;
  logOut: () => void;
  logIn: (credentials: Credentials) => Promise<void>;
}

export default function useAuth(): Auth {
  const [token, setTokenState] = useRecoilState(tokenState);
  const [isAuthenticating, setIsAuthenticating] = useRecoilState(
    isAuthenticatingState
  );
  const [authenticationError, setAuthenticationError] = useRecoilState(
    authenticationErrorState
  );
  const { org, setOrg } = useOrg();

  const setToken = useCallback(
    (newToken: string) => {
      setTokenState(newToken);
      localStorage.setItem(key, newToken);
    },
    [setTokenState]
  );

  const logOut = useCallback(() => {
    localStorage.removeItem(key);
    setTokenState(null);
  }, [setTokenState]);

  const logIn = useCallback(
    (credentials: Credentials) => {
      setIsAuthenticating(true);
      setAuthenticationError("");
      return fetch(`${proxyUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })
        .then(async (res) => {
          if (res.ok) return res.json();
          throw await res.json();
        })
        .then(({ id_token, org }) => {
          setToken(id_token);
          setOrg(org);
        })
        .catch(({ error_description }) => {
          setAuthenticationError(
            error_description || "There was a problem authenticating."
          );
        })
        .finally(() => {
          setIsAuthenticating(false);
        });
    },
    [setToken, setIsAuthenticating, setOrg, setAuthenticationError]
  );

  const decodedToken = useMemo(() => {
    if (token) {
      try {
        return jwtDecode(token);
      } catch {
        return null;
      }
    }
    return null;
  }, [token]) as any;

  return {
    isAuthenticated: Boolean(
      decodedToken && decodedToken.exp * 1000 > new Date().getTime() && org.id
    ),
    isAuthenticating,
    authenticationError,
    token,
    logOut,
    logIn,
  };
}
