import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	username : { 
        type: String,
        required: true
     },
	password : {
		type: String,
		required: true
	}
})

const model = mongoose.model('UserModel', UserSchema)

export default model;