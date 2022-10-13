import TokensChangeEmail from "../../../Models/User/TokensChangeEmail.js";

import {randomUUID} from "crypto";

class AuthTokenRepository {

	async generationTokenToChangeEmail(email) {
		try {
            
			return await TokensChangeEmail.create({
				email: email,
				token: randomUUID(),
				expires_at: new Date().setHours(new Date().getHours() + 1),
				status: "generated",
				created_at: new Date(),
				updated_at: new Date(),
			});

		} catch (e) {
			return false;
		} 
	}
}

export default new AuthTokenRepository;