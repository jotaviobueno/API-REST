import NameUpdateHistoryModel from "../../../Models/User/NameUpdateHistoryModel.js";
import UserModel from "../../../Models/User/UserModel.js";
import TokensChangeEmail from "../../../Models/User/TokensChangeEmail.js";
import LoginModel from "../../../Models/User/LoginModel.js";
import EmailUpdateHistory from "../../../Models/User/EmailUpdateHistory.js";

class UpdateRepository {

	async updateName(user, newName) {
		try {
			const User = await UserModel.updateOne({ email: user.email, deleted_at: null }, { updated_at: new Date(), username: newName });

			if ( User.modifiedCount === 1 )
				return await NameUpdateHistoryModel.create({ 
					email: user.email,
					new_name: newName,
					old_name: user.username,
					created_at: new Date(),
					updated_at: new Date()
				});
			
			else
				return false;
				
		} catch (e) {
			return false;
		}
	}

	async existToken(token) {
		const Token = await TokensChangeEmail.findOne({ token: token, status: "generated" });

		if (! Token )
			return false;

		return Token;
	}

	async updateEmail(user, newEmail) {
		const update = await UserModel.updateOne({ email: user.email, deleted_at: null }, { email: newEmail, updated_at: new Date() });

		if ( update.modifiedCount === 1 )
			return true;

		return false;
	}

	async disconnectAllSession(email) {
		const session = await LoginModel.findOne({ email: email, disconnected: null });

		if (session)
			await LoginModel.updateOne({ session_id: session.session_id }, { updated_at: new Date(), disconnected_in: new Date() });
	}

	async updateToken(token) {
		await TokensChangeEmail.updateOne({ token: token }, { updated_at: new Date(), status: "used" });
	}

	async createLog(oldemail, newemail, token) {
		await EmailUpdateHistory.create({
			old_email: oldemail,
			new_email: newemail,
			token: token,
			status: "success",
			created_at: new Date(),
			updated_at: new Date(),
		});
	}
}

export default new UpdateRepository;