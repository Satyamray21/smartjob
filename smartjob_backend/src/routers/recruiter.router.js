import {Router} from "express";
import {createRecruiter,
    viewRecruiterById
} from "../controllers/recruiter.controller.js";
import {upload} from "../middlewares/imageMulter.middleware.js";
const router = Router();
router.route("/").post(
    upload.fields([
        {
            name:"profileImage",
            maxCount:1
        }                 
   ]),
   createRecruiter
)
router.get("/:recruiterId",viewRecruiterById);
export default router;