import {Router} from "express";
import {createRecruiter,
    viewRecruiterById,
    viewAllRecruiter,
    deleteRecruiter

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
router.get("/",viewAllRecruiter);
router.get("/:recruiterId",viewRecruiterById);
router.delete("/:recruiterId",deleteRecruiter);
export default router;