var mongoose = require("mongoose");
 

var Product = require("./models/product");

var Comment = require("./models/comment");


var data=[
	{name:"cap",price:"3000",image:"https://usatftw.files.wordpress.com/2019/04/captain-america.jpg?w=1000&h=600&crop=1",desc:"sdfasjklds"},
	{name:"thor",price:"3000",image:"https://usatftw.files.wordpress.com/2019/04/captain-america.jpg?w=1000&h=600&crop=1",desc:"sdfasjkldkkkkks"},
	{name:"tony",price:"3000",image:"https://usatftw.files.wordpress.com/2019/04/captain-america.jpg?w=1000&h=600&crop=1",desc:"sdfghjasjklds"},
	{name:"natlie",price:"3000",image:"https://usatftw.files.wordpress.com/2019/04/captain-america.jpg?w=1000&h=600&crop=1",desc:"sdfajjksjklds"}
];
function seedDB(){
	Product.remove({},function(err){
		if(err){
			console.log(err)
		}
		console.log("removed products");
		//ADD NEW PRODUCTS
		// data.forEach(function(seed){
		// 	Product.create(seed,function(err,product){
		// 		if(err){
		// 			console.log(err);
		// 		}
		// 		else{
		// 			console.log("added a new product");
		// 			//ADD SOME COMMENTS
		// 			Comment.create(
		// 				{
		// 					text: "uthruhfuhasd",
		// 					author: "khjksdhfsia"
		// 				}, function(err,comment){
		// 					if(err){
		// 						console.log(err);
		// 					}else{
		// 						product.comments.push(comment);
		// 						product.save();
		// 						console.log("created a new comment");	
		// 					}
		// 				}
		// 			);
		// 		}	
		// 	});	
		//});
	});
}

module.exports = seedDB;