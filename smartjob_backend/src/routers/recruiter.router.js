import {Router} from "express";
import {createRecruiter,
    viewRecruiterById,
    viewAllRecruiter,
    deleteRecruiter,
    updateRecruiterById,
    updateStatus,
    inactiveRecruiter,
    activeRecruiter,
    blockRecruiter,
    loginRecruiter

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
router.get("/active-list",activeRecruiter);
router.get("/inactive-list",inactiveRecruiter);
router.get("/blocked-list",blockRecruiter);
router.post("/login",loginRecruiter);
router.get("/:recruiterId",viewRecruiterById);
router.delete("/:recruiterId",deleteRecruiter);
router.route("/:recruiterId").put(
    upload.fields([
        {
            name:"profileImage",
            maxCount:1
        }                 
   ]),
updateRecruiterById);
router.patch("/:recruiterId/:status",updateStatus);



export default router;