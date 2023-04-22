import express from "express";
import {
  getAllCourses,
  createCourse,
  getCourseLectures,
  addLecture,
  deleteCourse,
  deleteLecture,
} from "../controllers/courseController.js";
import singleUpload from "../middlewares/multer.js";
import { authorizeAdmin, isAuthenticated, authorizeSubscribers } from "../middlewares/auth.js";

const router = express.Router();
//get all courses without lectures
router.route("/courses").get(getAllCourses);
//create new course only admin
router.route("/createcourse").post(isAuthenticated,authorizeAdmin, singleUpload, createCourse);

// add lectures, delete lectures, get course details;
router
  .route("/course/:id")
  .get(isAuthenticated,authorizeSubscribers, getCourseLectures)
  .post(isAuthenticated,authorizeAdmin, singleUpload, addLecture)
  .delete(isAuthenticated,authorizeAdmin, deleteCourse)

//delete lectures
router.route("/lecture").delete(isAuthenticated,authorizeAdmin, deleteLecture);

export default router;