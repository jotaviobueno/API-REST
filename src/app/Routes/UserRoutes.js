import express from "express";

export const UserRoutes = express.Router();

// Controller's
import UserController from "../http/Controller/User/UserController.js";

UserRoutes.post("/sign-up", UserController.signUp);