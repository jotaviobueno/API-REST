// Dependencies
import mongoose from "mongoose";

// Model
const UserModel = mongoose.model( "user", {

	username: { type: String, required: true },
	avatar_url: { type: String, required: false },
	email: { type: String, required: true },
	email_verified_at: { type: Date, required: false },
	counter_code: { type: Number, required: false },
	phone_number: { type: Number, required: false },
	phone_verified_at: { type: Date, required: false },
	password: { type: String, required: true },
	created_at: { type: Date, required: true },
	updated_at: { type: Date, required: true },
	deleted_at: { type: Date }
    
});

export default UserModel;