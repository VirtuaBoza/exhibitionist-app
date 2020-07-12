import express from "express";
import jwtDecode from "jwt-decode";
import { signInUser, signUpUser } from "../services/auth0";
import { createClient, createUser, getUserClientData } from "../services/db";

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const {
    body: { email, password, name },
  } = req;

  if (!email || !password || !name) {
    res.status(400).send();
  } else {
    try {
      const signUpResponse = await signUpUser(email, password);

      const signUpResponseData = await signUpResponse.json();

      if (!signUpResponse.ok) {
        res.status(signUpResponse.status);
        res.json(signUpResponseData);
      } else {
        const { _id: userId } = signUpResponseData;
        const signInResponse = await signInUser(email, password);

        const signInResponseData = await signInResponse.json();

        if (!signInResponse.ok) {
          // TODO: Undo sign-up???
          res.status(signInResponse.status);
          res.json(signInResponseData);
        } else {
          const org = await createClient(name);
          const createUserSuccess = await createUser(userId, org.id);

          if (createUserSuccess) {
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

authRouter.post("/login", async (req, res) => {
  const {
    body: { email, password },
  } = req;

  const signInResponse = await signInUser(email, password);
  const signInResponseData = await signInResponse.json();
  if (!signInResponse.ok) {
    res.status(signInResponse.status);
    res.json(signInResponseData);
  } else {
    const token = jwtDecode(signInResponseData.id_token) as any;
    const userId = token.sub.replace("auth0|", "");
    const org = await getUserClientData(userId);
    res.json({ ...signInResponseData, org });
  }
});

export default authRouter;
