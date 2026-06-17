import express from "express";
import { getUsers ,  blockUsers,
  unblockUsers,
  deleteUsers,
  deleteUnverified, } from "../controllers/userController";

const router = express.Router();

router.get("/", getUsers);
router.post("/block", blockUsers);
router.post("/unblock", unblockUsers);
router.post("/delete", deleteUsers);
router.post("/delete-unverified", deleteUnverified);

export default router;