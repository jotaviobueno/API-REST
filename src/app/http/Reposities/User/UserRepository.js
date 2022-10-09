// Model
import UserModel from "../../../Models/User/UserModel.js";
import LoginModel from "../../../Models/User/LoginModel.js";

import bcrypt from "bcrypt";

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
}

export default new UserRepositories;