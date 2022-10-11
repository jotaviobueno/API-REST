import express from "express";

export const UserRoutes = express.Router();

// Controller's
import UserController from "../http/Controller/User/UserController.js";
import AuthLoginController from "../http/Controller/User/AuthLoginController.js";
import UpdateController from "../http/Controller/User/UpdateController.js";

// Request
import UserRequest from "../http/Request/User/UserRequest.js";
import AuthLoginRequest from "../http/Request/User/AuthLoginRequest.js";
import UpdateRequest from "../http/Request/User/UpdateRequest.js";

UserRoutes.post("/sign-up", UserRequest.validateSignUp, UserController.signUp);
UserRoutes.post("/sign-in", AuthLoginRequest.validateSignin, AuthLoginController.SignIn);

UserRoutes.get("/profile", UserRequest.validateProfile, UserController.profile);
UserRoutes.patch("/update/name", UpdateRequest.validateUpdateName, UpdateController.updateName);

UserRoutes.post("/profile/avatar", UserRequest.validateAddProfileAvatar, UserController.addAvatar);