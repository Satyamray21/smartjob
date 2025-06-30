import {Router} from "express";
import {createJD,getAllJd} from "../controllers/jd.controller.js"
import {parseFormData} from "../middlewares/multerParser.middleware.js";
import {verifyRecruiter} from "../middlewares/auth.middleware.js"
const router = Router();
router.route("/").post(verifyRecruiter,parseFormData,createJD);
router.route("/").get(getAllJd);
export default router;