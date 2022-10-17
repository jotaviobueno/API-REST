import express from "express";

export const UserRoutes = express.Router();

// Controller's
import UserController from "../http/Controller/User/UserController.js";
import AuthLoginController from "../http/Controller/User/AuthLoginController.js";
import AuthAuthenticationController from "../http/Controller/User/AuthAuthenticationController.js";
import AuthTokenController from "../http/Controller/User/AuthTokenController.js";
import UpdateController from "../http/Controller/User/UpdateController.js";

// Request
import UserRequest from "../http/Request/User/UserRequest.js";
import AuthLoginRequest from "../http/Request/User/AuthLoginRequest.js";
import UpdateRequest from "../http/Request/User/UpdateRequest.js";
import AuthAuthenticationRequest from "../http/Request/User/AuthAuthenticationRequest.js";
import AuthTokenRequest from "../http/Request/User/AuthTokenRequest.js";

UserRoutes.post("/sign-up", UserRequest.validateSignUp, UserController.signUp);
UserRoutes.post("/sign-in", AuthLoginRequest.validateSignin, AuthLoginController.SignIn);
UserRoutes.get("/profile", UserRequest.validateProfile, UserController.profile);
UserRoutes.post("/profile/avatar", UserRequest.validateAddProfileAvatar, UserController.addAvatar);

UserRoutes.get("/verify", AuthAuthenticationRequest.validateVerifyEmail, AuthAuthenticationController.verifyEmail);
UserRoutes.post("/new-verify/token", AuthAuthenticationRequest.validateGenerationNewToken, AuthAuthenticationController.generationNewToken);

UserRoutes.patch("/update/name", UpdateRequest.validateUpdateName, UpdateController.updateName);

UserRoutes.post("/get-token/change-email", AuthTokenRequest.validateGenerationTokenToChangeEmail, AuthTokenController.generationTokenToChangeEmail);
UserRoutes.post("/update-email", UpdateController.updateEmail);
UserRoutes.post("/get-token/change-password", AuthTokenController.generationTokenToChangePassword);