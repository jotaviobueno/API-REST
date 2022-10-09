// Model
import LoginModel from "../../../Models/User/LoginModel.js";

import {randomUUID} from "crypto";

class AuthLoginRepository {
	
	async verifySession(email) {
		const find = await LoginModel.find({ email: email, disconnected_in: null });

		if ( find.length >= 1 )
			await  LoginModel.updateOne({ email: email, disconnected_in: new Date(), updated_at: new Date() });
	}

	async createSession(email, userIp) {
		try {
			return await LoginModel.create({
				email: email,
				address_ip: userIp,
				session_id: randomUUID(),
				created_at: new Date(),
				updated_at: new Date(),
				disconnected_in: null
			});
		} catch(e) {
			return false;
		}
	}

	async validateIp(email, userIp) {
		const user = await LoginModel.find({email: email});

		let ip = [];

		user.forEach(async (a) => {
			if (a.address_ip === userIp)
				ip.push(a.address_ip);
		});

		if (ip.length === 0)
			return false;

		return true;
	}

	async existSession(email) {
		const session = await LoginModel.find({email: email});

		if (session.length === 0)
			return false;

		return true;
	}
}

export default new AuthLoginRepository;