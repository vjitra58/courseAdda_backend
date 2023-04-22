import express from "express";
import {
  login,
  logout,
  register,
  myProfile,
  changePassword,
  updateProfile,
  updateprofilepicture,
  forgetPassword,
  resetPassword,
  getAllUsers,
  updateUserRole,
  deleteUser,
  deleteMyProfile,
} from "../controllers/userController.js";
import { isAuthenticated, authorizeAdmin } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";


const router = express.Router();

// router.route("/").get();
router.route("/register").post(singleUpload, register);

//login
router.route("/login").post(login);
//logout
router.route("/logout").get(logout);
//view profile
router.route("/me").get(isAuthenticated ,myProfile)
  .delete(isAuthenticated, deleteMyProfile);

//change password
router.route("/changepassword").put(isAuthenticated, changePassword);
//update profile
router.route("/updateprofile").put(isAuthenticated, updateProfile);

//updating profile picture
router
  .route("/updateprofilepicture")
  .put(isAuthenticated, singleUpload ,updateprofilepicture);


//forgot password
router.route("/forgetpassword").post(forgetPassword);
//reset password
router.route("/resetpassword/:token").post(resetPassword);

// add to playlist
// remove from playlist

//admin routes
router.route("/admin/users").get(isAuthenticated, authorizeAdmin, getAllUsers);

router
  .route("/admin/user/:id")
  .put(isAuthenticated, authorizeAdmin, updateUserRole)
  .delete(isAuthenticated, authorizeAdmin, deleteUser);

export default router;