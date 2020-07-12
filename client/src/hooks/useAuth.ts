import jwtDecode from "jwt-decode";
import { useCallback, useMemo } from "react";
import { atom, useRecoilState } from "recoil";

const key = "id_token";

const tokenState = atom({
  key: "tokenState",
  default: localStorage.getItem(key),
});

export default function useAuth() {
  const [token, setTokenState] = useRecoilState(tokenState);

  const setToken = useCallback(
    (newToken) => {
      setTokenState(newToken);
      localStorage.setItem(key, newToken);
    },
    [setTokenState]
  );

  const logOut = useCallback(() => {
    localStorage.removeItem(key);
    setTokenState(null);
  }, [setTokenState]);

  const decodedToken = useMemo(() => token && jwtDecode(token), [token]) as any;

  return {
    isAuthenticated:
      decodedToken && decodedToken.exp * 1000 > new Date().getTime(),
    token: tokenState,
    setToken,
    logOut,
  };
}
