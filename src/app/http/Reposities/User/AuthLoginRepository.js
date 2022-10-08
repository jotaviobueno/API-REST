// Model
import LoginModel from "../../../Models/User/LoginModel.js";

import {randomUUID} from "crypto";

class AuthLoginRepository {

	async createSession(email) {
		try {
			return await LoginModel.create({
				email: email,
				session_id: randomUUID(),
				created_at: new Date(),
				updated_at: new Date(),
				disconnected_in: null
			});
		} catch(e) {
			return false;
		}
	}
}

export default new AuthLoginRepository;