import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { createNote, deleteNote, getNotes, updateNote } from "../controllers/note.controller.js";

const router = Router()
router.use(protect)

router.route("/").get(getNotes).post(createNote)
router.route("/:id").put(updateNote).delete(deleteNote)

export default router