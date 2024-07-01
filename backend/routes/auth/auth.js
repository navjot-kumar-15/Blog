import { Router } from "express";
import { loginUser, registerUser } from "../../controllers/auth/auth.js";
import multer from "multer";

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/user/avatar");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-"+file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/register", upload.single("image"), registerUser);
router.post("/login", loginUser);

export default router;
