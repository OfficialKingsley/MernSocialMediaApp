import { Router } from "express";
import {
  getAllUsers,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/userControllers";
import upload from "../middlewares/multer";
import verifyToken from "../middlewares/verifyToken";

const router: Router = Router();

router.post("/register", upload.single("profileImage"), registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

router.get("/", verifyToken, getAllUsers);

router.get("/:id", verifyToken, getUser);
export default router;
