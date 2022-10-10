import NameUpdateHistoryModel from "../../../Models/User/NameUpdateHistoryModel.js";
import UserModel from "../../../Models/User/UserModel.js";

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

}

export default new UpdateRepository;