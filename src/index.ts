import cors from "cors";
import router from "./routes/routes";
import postRouter from "./routes/posts";
import cookieParser from "cookie-parser";

const express = require("express");
const app = express();

app.use(express.json({ limit: "100mb" }));
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL || "https://floroteka.netlify.app",
  })
);
app.use(cookieParser());
app.use("/", router);
app.use("/", postRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
