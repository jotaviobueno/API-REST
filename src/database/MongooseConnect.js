// Dependencies
import mongoose from "mongoose";

import {envConfig} from "../config/envConfig.js";

export async function Connect () {

	return await mongoose.connect( "mongodb://localhost:27017/exghange").then( () => {
		console.log("connected with Mongoose");

		return true;
	}).catch( (e) => {
		throw (e);
	});
}