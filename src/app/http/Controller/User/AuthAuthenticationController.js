import AuthAuthenticationServices from "../../Services/User/AuthAuthenticationServices.js";

class AuthAuthenticationController {

	async verifyEmail(req, res) {
		const { id } = req.query;
        
		const auth = await AuthAuthenticationServices.verifyEmail(id);

		return res.status(auth.statuscode).json({ message: auth.message });
	}

	async generationNewToken(req, res) {
		const { email } = req.body;

		const newToken = await AuthAuthenticationServices.generationNewAuthToken(email);

		return res.status(newToken.statuscode).json({ message: newToken.message });
	}
}

export default new AuthAuthenticationController;