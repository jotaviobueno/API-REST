// Repositories
import UserRepoistory from "../../Reposities/User/UserRepository.js";
import AuthAuthenticationRepository from "../../Reposities/User/AuthAuthenticationRepository.js";

// Service
import SESService from "../SES/SESServices.js";

class AuthAuthenticationServices {

	async verifyEmail(id) {

		await AuthAuthenticationRepository.verifyExpiryDate(id);

		let informationId;

		if (! (informationId = await AuthAuthenticationRepository.existId(id)) )
			return { statuscode: 403, message: "the verification id is invalid" };

		let user;

		if (! (user = await UserRepoistory.existUser(informationId.email)) )
			return { statuscode: 422, message: "email that is linked to this account is having problems..." };

		await AuthAuthenticationRepository.amountUserId(user.email);

		if (user.email_verified_at != null) 
			return { statuscode: 422, message: "unable to re-check" };

		if ( await AuthAuthenticationRepository.updateId(id) ) {

			await AuthAuthenticationRepository.updateUser(user.email);

			await SESService.verifiedEmail(user.email);

			return { statuscode: 204, message: "" };
		}

		return { statuscode: 400, message: "Could not complete..." };
	}
}

export default new AuthAuthenticationServices;