import EmailValidation from "../../../Models/User/EmailValidation.js";
import UserModel from "../../../Models/User/UserModel.js";

class AuthAuthenticationRepository {

	async existId(id) {
		try {
			const informationId = await EmailValidation.findOne({ uuid: id, status: "generated" });

			if (! informationId )
				return false;

			return informationId;
		} catch (e) {
			return false;
		}
	}

	async updateId(id) {
		const update = await EmailValidation.updateOne({ id: id }, { updated_at: new Date(), status: "used"});

		if ( update.modifiedCount === 1 )
			return true;

		return false;
	}

	async updateUser(email) {
		const update = await UserModel.updateOne({ email: email, deleted_at: null }, { updated_at: new Date(), email_verified_at: new Date() });

		if ( update.matchedCount === 1 )
			return true;

		return false;
	}

	async amountUserId(email) {
		const amount = await EmailValidation.find({ email: email, status: "generated" });

		if ( amount.length > 0 ) {

			amount.forEach( async (id) => {
				await EmailValidation.updateOne({ uuid: id.uuid }, { status: "discarted", updated_at: new Date() });
			});
		}
	}

	async verifyExpiryDate(token) {
		const findToken = await EmailValidation.findOne({ uuid: token });

		if ( new Date() >= findToken.expires_at )
			await EmailValidation.updateOne({ uuid: token }, { updated_at: new Date(), status: "discarted" });
	}
}

export default new AuthAuthenticationRepository;