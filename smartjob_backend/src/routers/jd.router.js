import {Router} from "express";
import {createJD,getAllJd,getOwnPostedJD,deleteJd} from "../controllers/jd.controller.js"
import {parseFormData} from "../middlewares/multerParser.middleware.js";
import {verifyRecruiter} from "../middlewares/auth.middleware.js"
const router = Router();
router.route("/").post(verifyRecruiter,parseFormData,createJD);
router.route("/").get(getAllJd);//for admin.
router.route('/ownJd').get(verifyRecruiter,getOwnPostedJD);

router.route('/:job_id').delete(deleteJd);

export default router;