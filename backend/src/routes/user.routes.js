import { Router } from "express";
const router = Router();


import { registerUser, loginUser, logoutUser, getUserProfile } from '../controllers/user.controllers.js'
import {verifyJWT} from '../middlewares/auth.middleware.js'

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(verifyJWT,logoutUser);
router.route('/profile').get(verifyJWT,getUserProfile);

export default router;