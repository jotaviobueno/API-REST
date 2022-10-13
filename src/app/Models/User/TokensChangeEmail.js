// Dependencies
import mongoose from "mongoose";

// Model
const TokensChangeEmail = mongoose.model( "TokensChangeEmail", {

	email: { type: String, required: true },
	token: { type: String, required: true },
	expires_at: { type: Date, required: true },
	status: { type: String, required: true },
	created_at: { type: Date, required: true },
	updated_at: { type: Date, required: true },
    
});

export default TokensChangeEmail;