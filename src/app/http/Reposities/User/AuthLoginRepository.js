// Model
import LoginModel from "../../../Models/User/LoginModel.js";

import {randomUUID} from "crypto";

class AuthLoginRepository {
	
	async verifySession(email) {
		const find = await LoginModel.find({ email: email, disconnected_in: null });

		if ( find.length >= 1 )
			await  LoginModel.updateOne({ email: email, disconnected_in: new Date(), updated_at: new Date() });
	}

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