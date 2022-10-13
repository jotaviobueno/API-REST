import AuthTokenServices from "../../Services/User/AuthTokenServices.js";

class AuthTokenController {

	async generationTokenToChangeEmail(req, res) {
		const { session_id } = req.headers;

		const token = await AuthTokenServices.generationTokenToChangeEmail(session_id);
        
		return res.status(token.statuscode).json({ message: token.message });
	}
}

export default new AuthTokenController;