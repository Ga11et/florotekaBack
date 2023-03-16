import { deleteControllers } from "../controllers/delete";
import { getControllers } from "../controllers/get";
import { postControllers } from "../controllers/post";
import { updateControllers } from "../controllers/update";
import authMiddleware from "../middlewares/authMiddleware";
import {
  postBeforeAfterValidator,
  postScienceActivityValidator,
  postTechnologiesValidator,
  postThingsValidator,
} from "../validations/validations";
import { router } from "./main";

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
