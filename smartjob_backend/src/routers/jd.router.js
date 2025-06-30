import {Router} from "express";
import {createJD,getAllJd,getOwnPostedJD} from "../controllers/jd.controller.js"
import {parseFormData} from "../middlewares/multerParser.middleware.js";
import {verifyRecruiter} from "../middlewares/auth.middleware.js"
const router = Router();
router.route("/").post(verifyRecruiter,parseFormData,createJD);
router.route("/").get(getAllJd);//for admin.
router.route('/ownJd').get(verifyRecruiter,getOwnPostedJD);

export default router;