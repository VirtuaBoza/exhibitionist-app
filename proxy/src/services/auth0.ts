import fetch from "node-fetch";

export function signUpUser(email: string, password: string) {
  return fetch("https://exhibitionist-dev.us.auth0.com/dbconnections/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      client_id: process.env.AUTH0_CLIENT_ID,
      connection: "Username-Password-Authentication",
    }),
  });
}

export function signInUser(email: string, password: string) {
  return fetch("https://exhibitionist-dev.us.auth0.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      grant_type: "password",
      client_id: process.env.AUTH0_CLIENT_ID,
      username: email,
      password,
    }),
  });
}
