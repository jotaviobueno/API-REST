// Dependencies
import mongoose from "mongoose";

// Model
const ChangePasswordHistory = mongoose.model( "ChangePasswordHistory", {

	email: {type: String, required: true },
	token: { type: String, required: true },
	status: { type: String, required: true },
	created_at: { type: Date, required: true },
	updated_at: { type: Date, required: true },
    
});

export default ChangePasswordHistory;