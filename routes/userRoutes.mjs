import express from "express";
import { adminUserFetch, userFetch } from "../controller/userMethods.mjs";
import { walletAmountFetch } from "../controller/userMethods.mjs";
import { isLogged } from "../middleware/isLogged.mjs";
import { isAdmin } from "../middleware/isAdmin.mjs";
const router = express.Router();


//Get a user's personal document  by ID
router.get("/getUser", isLogged, userFetch);

// Get a user's wallet amount by ID
router.get("/getWalletAmount", isLogged, walletAmountFetch);

//Admin Controls
//Get a user's personal document  by as an Admin ID
router.get("/getUser_Admin", isLogged, isAdmin, adminUserFetch);

export default router;