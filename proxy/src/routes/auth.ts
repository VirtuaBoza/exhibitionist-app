import express from "express";
import gql from "graphql-tag";
import fetch from "node-fetch";
import client from "../apolloClient";

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const {
    body: { email, password, name },
  } = req;

  if (!email || !password || !name) {
    res.status(400).send();
  } else {
    try {
      const signUpResponse = await fetch(
        "https://exhibitionist-dev.us.auth0.com/dbconnections/signup",
        {
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
        }
      );

      const signUpResponseData = await signUpResponse.json();

      if (!signUpResponse.ok) {
        res.status(signUpResponse.status);
        res.json(signUpResponseData);
      } else {
        const { _id: userId } = signUpResponseData;
        const signInResponse = await fetch(
          "https://exhibitionist-dev.us.auth0.com/oauth/token",
          {
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
          }
        );

        const signInResponseData = await signInResponse.json();

        if (!signInResponse.ok) {
          // TODO: Undo sign-up???
          res.status(signInResponse.status);
          res.json(signInResponseData);
        } else {
          const createClientResult = await client.mutate({
            variables: { name },
            mutation: gql`
              mutation InsertClient($name: String!) {
                insert_clients(objects: { name: $name }) {
                  returning {
                    id
                    name
                  }
                }
              }
            `,
          });

          const org = createClientResult.data.insert_clients.returning[0];

          const createUserResult = await client.mutate({
            variables: {
              userId,
              clientId: org.id,
            },
            mutation: gql`
              mutation InsertUser($userId: String!, $clientId: uuid!) {
                insert_users(objects: { id: $userId, client_id: $clientId }) {
                  affected_rows
                }
              }
            `,
          });

          if (createUserResult.data.insert_users.affected_rows) {
            res.json({ ...signInResponseData, org });
          } else {
            res.status(500).send();
          }
        }
      }
    } catch {
      res.status(500).send();
    }
  }
});

export default authRouter;
