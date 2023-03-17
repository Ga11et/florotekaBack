import { updateControllers } from "./../controllers/update";
import {
  postAuthValidator,
  postPhotoValidator,
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

export default router;
