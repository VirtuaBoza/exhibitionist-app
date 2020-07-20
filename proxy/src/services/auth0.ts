import fetch from "node-fetch";

export function signUpUser(email: string, password: string) {
  return fetch(`${process.env.AUTH0_URL}/dbconnections/signup`, {
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
  return fetch(`${process.env.AUTH0_URL}/oauth/token`, {
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

export async function checkUserExists(email: string): Promise<boolean> {
  const token = await getManagementApiToken();

  const res = await fetch(
    `${
      process.env.AUTH0_URL
    }/api/v2/users-by-email?email=${email.toLocaleLowerCase()}`,
    {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) throw res;

  const body = await res.json();

  return body.length;
}

async function getManagementApiToken() {
  const tokenData = await fetch(`${process.env.AUTH0_URL}/oauth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: process.env.AUTH0_PROXY_CLIENT_ID,
      client_secret: process.env.AUTH0_PROXY_CLIENT_SECRET,
      audience: `${process.env.AUTH0_URL}/api/v2/`,
    }),
  }).then((res) => {
    if (!res.ok) throw res;
    return res.json();
  });

  return tokenData.access_token;
}
