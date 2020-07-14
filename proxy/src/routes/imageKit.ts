import express from "express";
import ImageKit from "imagekit";

const imageKit = new ImageKit({
  publicKey: "A1C3TXkJRO5Uep1Po71y17zj9Tg=",
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
  urlEndpoint: "https://ik.imagekit.io/e1zv3hm1fuybqv",
});

const imageKitRouter = express.Router();

imageKitRouter.get("/", (req, res) => {
  res.json(imageKit.getAuthenticationParameters());
});

export default imageKitRouter;
