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

export interface Credentials {
  email: string;
  password: string;
}

export interface Auth {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  token: string | null;
  logOut: () => void;
  logIn: (credentials: Credentials) => Promise<void>;
}

export default function useAuth(): Auth {
  const [token, setTokenState] = useRecoilState(tokenState);
  const [isAuthenticating, setIsAuthenticating] = useRecoilState(
    isAuthenticatingState
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
      return fetch(`${proxyUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })
        .then((res) => {
          if (res.ok) return res.json();
          throw res;
        })
        .then(({ id_token, org }) => {
          setToken(id_token);
          setOrg(org);
        })
        .catch((res) => {
          console.log(res);
        })
        .finally(() => {
          setIsAuthenticating(false);
        });
    },
    [setToken, setIsAuthenticating, setOrg]
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
    token,
    logOut,
    logIn,
  };
}
