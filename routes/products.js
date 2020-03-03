var express = require("express");
var router = express.Router();
var Product = require("../models/product")
//var GENRE = ["CSE","MECHANICAL","ELECTRONICS","CIVIL","ART","LITERATURE"]; 


router.get("/products",function(req,res){
//get data from form to products array
	Product.find({},function(err,allProducts){
		if(err){
			console.log(err);
		}
		else{
			res.render("products/index",{products:allProducts});
		}
	}); 
	
});




//create a new product

router.post("/products",isLoggedIn ,function(req,res){
	
	var title = req.body.title;    
	var genre = req.body.genre;
	var created = req.body.created;
	var content = req.body.content;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newProduct = {
		author:author, 
		title:title,
		genre:genre,
		created: created,
		content:content
	};
	Product.create(newProduct,function(err,newlyCreated){
		if(err){
			console.log(err);
		}
		else{
			res.redirect("/products");
		}
	});
	

	//products.push(newProduct);
	//redirect to products page
	//res.redirect("/products");
});

router.get("/products/new",isLoggedIn ,function(req,res){

	res.render("products/new")
});

router.get("/products/:id",function(req,res){

	//FIND THE PRODUCT WITH THE GIVEN ID
	Product.findById(req.params.id).populate("comments").exec(function(err,foundProduct){
		if(err){
			console.log(err);
		}else{
			//console.log(foundProduct);
			res.render("products/show",{product: foundProduct});
		}
	});
}); 
router.get("/:genre",function(req,res){
//get data from form to products array
	var Genre=req.params.genre;
	//console.log(Genre);
	//console.log(genre); 
	Product.find({},function(err,allProducts){
		if(err){
			console.log(err);
		}
		else{
			res.render("products/genre_selective",{products:allProducts, Genre:Genre});
			//console.log(Genre);
		}
	}); 
	

});


//EDIT PRODUCT
router.get("/products/:id/edit",checkProductOwnership,function(req,res){
	Product.findById(req.params.id, function(err, foundProduct){
		res.render("products/edit",{product: foundProduct});
	});	
});
	

//UPDATE PRODUCTS

router.put("/products/:id",checkProductOwnership ,function(req,res){
	var updateProduct = {
			title : req.body.title,    
			genre : req.body.genre,

			content : req.body.content

	}
	//find and update the correct product  
	Product.findByIdAndUpdate(req.params.id,updateProduct,function(err, updatedProduct){
		if(err){
			res.redirect("/products")
		}else{
			res.redirect("/products/"+ req.params.id)
		}

	} )
})


//DESTROY PRODUCT ROUTE
router.delete("/products/:id",checkProductOwnership,function(req,res){
	Product.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/products");
		}
		else{
			res.redirect("/products");
		}
	})

});



function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	console.log("YOU NEED TO BE LOGGED IN FIRST!!");
	res.redirect("/login");	
}

function checkProductOwnership(req,res,next){
	if(req.isAuthenticated()){

		Product.findById(req.params.id, function(err, foundProduct){
			if(err){
				res.redirect("back");
			}
			else{
				if(foundProduct.author.id.equals(req.user._id)){	
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


module.exports = router;