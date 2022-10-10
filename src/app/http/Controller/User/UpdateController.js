import UpdateServices from "../../Services/User/UpdateServices.js";

class UpdateController {

	async updateName(req, res) {
		const { session_id } = req.headers;
		const { new_name } = req.body;

		const updateName = await UpdateServices.updateName(session_id, new_name);

		return res.status(updateName.statuscode).json({ message: updateName.message });
	}
}

export default new UpdateController;