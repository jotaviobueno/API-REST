import TokensChangeEmail from "../../../Models/User/TokensChangeEmail.js";
import TokensToChangePassword from "../../../Models/User/TokensToChangePassword.js";

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

	async amountOfUserTokens(email) {
		const tokens = await TokensChangeEmail.find({ email: email, status: "generated" });

		if ( tokens.length > 0 )
			tokens.forEach( async (token) => {
				await TokensChangeEmail.updateOne({ token: token.token }, { status: "discarted" });
			});
	}

	async checkTokenExpirationData(token) {
		const findToken = await TokensChangeEmail.findOne({ token: token });

		if ( new Date() >= findToken.expires_at )
			await TokensChangeEmail.updateOne({ token: token }, { status: "discarted" });
	}

	async generationTokenToChangePassword(email) {
		return await TokensToChangePassword.create({
			email: email,
			token: randomUUID(),
			expires_at: new Date().setHours(new Date().getHours() + 1),
			status: "generated",
			created_at: new Date(),
			updated_at: new Date(),
		});
	}

	async amountOfUserPaswordTokens(email) {
		const tokens = await TokensToChangePassword.find({ email: email, status: "generated" });
	
		if ( tokens.length > 0 )
			tokens.forEach( async (token) => {
				await TokensToChangePassword.updateOne({ token: token.token }, { status: "discarted" });
			});
	}

	async checkPasswordTokenExpirationData(token) {
		const findToken = await TokensToChangePassword.findOne({ token: token });

		if ( new Date() >= findToken.expires_at )
			await TokensToChangePassword.updateOne({ token: token }, { status: "discarted" });
	}
}

export default new AuthTokenRepository;