var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose")

var UserSchema = new mongoose.Schema({
	username: String,
	password: String,
	DOB:String,
	college:String,
	email:String

});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User",UserSchema); 