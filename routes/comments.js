//============================
//COMMENT ROUTES
//============================

var express = require("express");
var router = express.Router();
var Product = require("../models/product");
var Comment = require("../models/comment");



router.get("/products/:id/comments/new",isLoggedIn,function(req,res){
	//find product by id
	Product.findById(req.params.id, function(err, product){
		if(err){
			console.log(err);
		}else{
				res.render("comments/new",{product: product});
		}
	});

});

router.post("/products/:id/comments",isLoggedIn,function(req, res){
	//lookup product using id
	Product.findById(req.params.id, function(err, product){
		if(err){
			console.log(err);
			res.redirect("/products")
		}else{
			 Comment.create(req.body.comment, function(err, comment){
			 	if(err){
			 		console.log(err);
			 	}else{
			 		//add username and id to the comment
			 		comment.author.id = req.user._id;
			 		comment.author.username = req.user.username
			 		req.user.username
			 		comment.save();
			 		product.comments.push(comment);
			 		product.save();
			 		res.redirect('/products/'+product._id);
			 	}
			 });
		}
	});
})

router.get("/products/:id/comments/:comment_id/edit",checkCommentOwnership, function(req,res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect("back");
		}else{
			res.render("comments/edit",{product_id: req.params.id, comment: foundComment});
		}
	});
	
});


router.put("/products/:id/comments/:comment_id",function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			res.redirect("back");
		}else{
			res.redirect("/products/"+ req.params.id);
		}

	})
});

router.delete("/products/:id/comments/:comment_id",checkCommentOwnershiAndProductOwnership, function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back");
		}
		else{
			res.redirect("/products/"+req.params.id);
		}
	});

});



function checkCommentOwnershiAndProductOwnership(req,res,next){
	if(req.isAuthenticated()){

		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				res.redirect("back");
			}
			else if(foundComment.author.id.equals(req.user._id)){
				next();
			}
			else{

				Product.findById(req.params.id, function(err, foundProduct){
					if(err){
						res.redirect("back");
					}
					else{
						if(foundProduct.author.id.equals(req.user._id)){	
							next();
						}else{
							console.log("you are not authorized");
							res.redirect("back");
						}
					}

				});


			}

		});
	}else{
		console.log("you need to be logged in for this functionality");
		res.redirect("back"); 

	}
}


function checkCommentOwnership(req,res,next){
	if(req.isAuthenticated()){

		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				res.redirect("back");
			}
			else{
				if(foundComment.author.id.equals(req.user._id)){	
					next();
				}else{
					res.redirect("back");
				}
			}

		});
	}else{
		console.log("you need to be logged in for this functionality");
		res.redirect("back"); 

	}
}


//middleware
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	console.log("you need to be logged in first");
	res.redirect("/login");	
}

module.exports = router;