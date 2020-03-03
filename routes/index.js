


var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


router.get("/",function(req,res){
	res.render("landing");
});
router.get("/about",function(req,res){
	res.render("about");
});
router.get("/about/creators",function(req,res){
	res.render("about_creators");
});

router.get("/profile",isLoggedIn ,function(req,res){

	res.render("profile",{person:req.user});
});




//=======================
//AUTH ROUTES
//=======================

//SHOW REGISTER FORM
router.get("/register",function(req,res){
	res.render("register");
})

//SIGN UP LOGIC
router.post("/register",function(req,res){
	var newUser = new User({
		username: req.body.username, 
		DOB: req.body.DOB,
		email: req.body.email,
		college: req.body.college
	});
	User.register(newUser, req.body.password,function(err, user){
		if(err){
			console.log(err);
			return res.render("register");
		} 
		passport.authenticate("local")(req,res,function(){
			res.redirect("/products");
		});
	});
	
});

//show login form
router.get("/login",function(req,res){
	res.render("login");
});
//LOGIN LOGIC
router.post("/login",passport.authenticate("local",
	{
		successRedirect:"/products",
		failureRedirect:"/login"
	}), function(req,res){
});



//logout route
router.get("/logout",function(req,res){
	req.logout();
	res.redirect("/products");
})

//middleware
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");	
}

module.exports = router;