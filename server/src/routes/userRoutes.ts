import { Router } from "express";
import {
  addFriend,
  getAllUsers,
  getUser,
  getUserFriends,
  loginUser,
  logoutUser,
  registerUser,
  removeFriend,
} from "../controllers/userControllers";
import upload from "../middlewares/multer";
import verifyToken from "../middlewares/verifyToken";

const router: Router = Router();

router.post("/register", upload.single("profileImage"), registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

router.get("/", verifyToken, getAllUsers);
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

router.patch("/:id/friends/:friendId/add", verifyToken, addFriend);
router.patch("/:id/friends/:friendId/remove", verifyToken, removeFriend);

export default router;
