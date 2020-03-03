
var mongoose = require("mongoose");

//Defining Product schema 
//https://mongoosejs.com/docs/guide.html#definition
var productSchema = new mongoose.Schema({
	title: String,
	genre: String,
	created:{type: Date, default:Date.now},
	content: String,
	author:{
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	comments:[
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

//To use our schema definition, we need to convert our blogSchema 
//into a Model we can work with. To do so, we pass it into 
//mongoose.model(modelName, schema)
module.exports = mongoose.model("Product",productSchema);
