import UpdateServices from "../../Services/User/UpdateServices.js";

class UpdateController {

	async updateName(req, res) {
		const { session_id } = req.headers;
		const { new_name } = req.body;

		const updateName = await UpdateServices.updateName(session_id, new_name);

		return res.status(updateName.statuscode).json({ message: updateName.message });
	}

	async updateEmail(req, res) {
		const { token } = req.query;
		const { new_email } = req.body;

		const update = await UpdateServices.updateEmail(token, new_email);

		return res.status(update.statuscode).json({ message: update.message });
	}

	async updatePasswordByToken(req, res) {
		const { token } = req.query;
		const { new_password } = req.body;

		const update = await UpdateServices.updatePasswordByToken(token, new_password);

		return res.status(update.statuscode).json({ message: update.message });
	}
}

export default new UpdateController;