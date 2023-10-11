import express from "express";
const router = express.Router();

import {
  getAllusers,
  getSingleUser,
  showMe,
  updateUser,
  updateUserPassword,
  deleteUser,
} from "../controllers/user.js";
import { authorization } from "../middlewares/authentication.js";

router.get("/getallusers", authorization("admin"), getAllusers);

router.get("/showme", showMe);
router.patch("/updateuser", updateUser);
router.patch("/updatepassword", updateUserPassword);
router.delete("/deleteuser/:id", authorization("admin"), deleteUser);

router.get("/:id", getSingleUser);

export default router;
