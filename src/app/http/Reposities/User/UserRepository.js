// Model
import UserModel from "../../../Models/User/UserModel.js";
import LoginModel from "../../../Models/User/LoginModel.js";
import EmailValidation from "../../../Models/User/EmailValidation.js";

import bcrypt from "bcrypt";
import {randomUUID} from "crypto";

class UserRepositories {

	async existUser(email) {
		const user = await UserModel.findOne({ email: email, deleted_at: null });

		if (! user )
			return false;

		return user;
	}

	async store(username, email, password) {
		try {
			return await UserModel.create({
				username: username,
				avatar_url: null,
				email: email,
				email_verified_at: null,
				counter_code: null,
				phone_number: null,
				phone_verified_at: null,
				password: await bcrypt.hash(password, 10),
				created_at: new Date(),
				updated_at: new Date(),
				deleted_at: null
			});
		} catch (e) {
			return false;
		}
	}

	async existSession(session_id) {
		const session = await LoginModel.findOne({ session_id: session_id, disconnected_in: null });

		if (! session )
			return false;

		return session;
	}

	async addProfileAvatar(avatar_url, email) {
		try {
			await UserModel.updateOne({ email: email, deleted_at: null }, { avatar_url: avatar_url, updated_at: new Date() });
		} catch (e) {
			return false;
		}
	}

	async EmailValidation(email) {
		try {
			return await EmailValidation.create({
				email: email,
				uuid: randomUUID(),
				expires_at: new Date().setHours(new Date().getHours() + 2),
				status: "generated",
				created_at: new Date(),
				updated_at: new Date(),
			});
		} catch (e) {
			return false;
		}
	}
}

export default new UserRepositories;