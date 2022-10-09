import express from "express";

export const UserRoutes = express.Router();

// Controller's
import UserController from "../http/Controller/User/UserController.js";
import AuthLoginController from "../http/Controller/User/AuthLoginController.js";

// Request
import UserRequest from "../http/Request/User/UserRequest.js";
import AuthLoginRequest from "../http/Request/User/AuthLoginRequest.js";

UserRoutes.post("/sign-up", UserRequest.ValidateSignUp, UserController.signUp);
UserRoutes.post("/sign-in", AuthLoginRequest.ValidateSignin, AuthLoginController.SignIn);

UserRoutes.get("/profile", UserController.profile);