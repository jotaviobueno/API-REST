import AuthAuthenticationServices from "../../Services/User/AuthAuthenticationServices.js";

class AuthAuthenticationController {

	async verifyEmail(req, res) {
		const { id } = req.query;
        
		const auth = await AuthAuthenticationServices.verifyEmail(id);

		return res.status(auth.statuscode).json({ message: auth.message });
	}
}

export default new AuthAuthenticationController;