import express from "express";

export const UserRoutes = express.Router();

// Controller's
import UserController from "../http/Controller/User/UserController.js";
import AuthLoginController from "../http/Controller/User/AuthLoginController.js";

// Request
import UserRequest from "../http/Request/User/UserRequest.js";

UserRoutes.post("/sign-up", UserRequest.ValidateSignUp, UserController.signUp);
UserRoutes.post("/sign-in", AuthLoginController.SignIn);
