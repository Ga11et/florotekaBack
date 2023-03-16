import { updateControllers } from "./../controllers/update";
import {
  postAuthValidator,
  postBeforeAfterValidator,
  postPhotoValidator,
  postScienceActivityValidator,
  postTechnologiesValidator,
  postThingsValidator,
} from "./../validations/validations";
import { getControllers } from "./../controllers/get";
import { postControllers } from "../controllers/post";
import authMiddleware from "../middlewares/authMiddleware";
import { postPlantValidator } from "../validations/validations";
import { deleteControllers } from "../controllers/delete";
import { router } from "./main";

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

export default router;
