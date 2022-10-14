// Dependencies
import mongoose from "mongoose";

// Model
const EmailUpdateHistory = mongoose.model( "EmailUpdateHistory", {

	old_email: { type: String, required: true },
	new_email: {type: String, required: true },
	token: { type: String, required: true },
	status: { type: String, required: true },
	created_at: { type: Date, required: true },
	updated_at: { type: Date, required: true },
    
});

export default EmailUpdateHistory;