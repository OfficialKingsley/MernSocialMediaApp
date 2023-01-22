import { Router } from "express";
import { addPost, getPosts } from "../controllers/postController";
import { uploadPostImage } from "../middlewares/multer";
import verifyToken from "../middlewares/verifyToken";

const router = Router();

router.get("/", verifyToken, getPosts);
router.post("/", verifyToken, uploadPostImage.single("postImage"), addPost);

export default router;
