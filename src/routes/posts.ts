import { updateControllers } from "./../controllers/update";
import { deleteControllers } from "../controllers/delete";
import { getControllers } from "../controllers/get";
import { postControllers } from "../controllers/post";
import authMiddleware from "../middlewares/authMiddleware";
import {
  postBeforeAfterValidator,
  postScienceActivityValidator,
  postTechnologiesValidator,
  postThingsValidator,
} from "../validations/validations";

const Router = require("express").Router;

const postsRouter = new Router();

postsRouter.get("/posts", getControllers.getPosts);
postsRouter.get("/post/:postId", getControllers.getPostById);

postsRouter.post(
  "/beforeAfter",
  authMiddleware,
  postBeforeAfterValidator,
  postControllers.postBeforeAfter
);
postsRouter.post(
  "/technologies",
  authMiddleware,
  postTechnologiesValidator,
  postControllers.postTechnologies
);
postsRouter.post(
  "/things",
  authMiddleware,
  postThingsValidator,
  postControllers.postThings
);
postsRouter.post(
  "/studyProject",
  authMiddleware,
  postTechnologiesValidator,
  postControllers.postStudyProject
);
postsRouter.post(
  "/scienceActivity",
  authMiddleware,
  postScienceActivityValidator,
  postControllers.postScienceActivity
);

postsRouter.delete("/posts", authMiddleware, deleteControllers.post);

postsRouter.put("/post/:postId", authMiddleware, updateControllers.updatePost);

export default postsRouter;
