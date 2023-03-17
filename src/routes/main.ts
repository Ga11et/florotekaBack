import { Request, Response } from "express";
import { deleteControllers } from "../controllers/delete";
import { getControllers } from "../controllers/get";
import { postControllers } from "../controllers/post";
import { updateControllers } from "../controllers/update";
import authMiddleware from "../middlewares/authMiddleware";
import {
  postAuthValidator,
  postBeforeAfterValidator,
  postPhotoValidator,
  postPlantValidator,
  postScienceActivityValidator,
  postTechnologiesValidator,
  postThingsValidator,
} from "../validations/validations";

const Router = require("express").Router;

export const router = new Router();

router.get("/", (req: Request, res: Response) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.json("main");
});

// Posts

router.get("/posts", getControllers.getPosts);
router.get("/post/:postId", getControllers.getPostById);

router.post(
  "/beforeAfter",
  authMiddleware,
  postBeforeAfterValidator,
  postControllers.postBeforeAfter
);
router.post(
  "/technologies",
  authMiddleware,
  postTechnologiesValidator,
  postControllers.postTechnologies
);
router.post(
  "/things",
  authMiddleware,
  postThingsValidator,
  postControllers.postThings
);
router.post(
  "/studyProject",
  authMiddleware,
  postTechnologiesValidator,
  postControllers.postStudyProject
);
router.post(
  "/scienceActivity",
  authMiddleware,
  postScienceActivityValidator,
  postControllers.postScienceActivity
);

router.delete("/posts", authMiddleware, deleteControllers.post);

router.put("/post/:postId", authMiddleware, updateControllers.updatePost);

// Others

router.get("/plants", getControllers.getPlants);
router.get("/galery", getControllers.getPhotos);
router.get("/refresh", getControllers.getRefresh);

router.post("/login", postAuthValidator, postControllers.postAuth);
router.post(
  "/plants",
  authMiddleware,
  postPlantValidator,
  postControllers.postPlant
);

router.post(
  "/galery",
  authMiddleware,
  postPhotoValidator,
  postControllers.postPhoto
);

router.delete("/plants", authMiddleware, deleteControllers.deletePlant);
router.delete("/gallery", authMiddleware, deleteControllers.photo);

router.put("/plants", authMiddleware, updateControllers.updatePlant);

export default router;
