
//PORT VARIABLE TO ALLOCATE SERVER NUMBER 
port = 501;

//INTRODUCING THE EXPRESS INTO THE FILE
var express = require("express");
var app = express();

//Node.js body parsing middleware.
//Parse incoming request bodies in a middleware before your 
//handlers,available under the req.body property.
var bodyParser = require("body-parser");

//elegant mongodb object modeling for node.js
//Functions explained in models/products.js
var mongoose = require("mongoose");

//Passport is Express-compatible authentication middleware for Node.js.

/*
	Passport's sole purpose is to authenticate requests, 
	which it does through an extensible set of plugins known 
	as strategies. Passport does not mount routes or assume 
	any particular database schema, which maximizes flexibility 
	and allows application-level decisions to be made by the 
	developer. The API is simple: you provide Passport a request 
	to authenticate, and Passport provides hooks for controlling 
	what occurs when authentication succeeds or fails.
*/
var passport = require("passport");
methodOverride = require("method-override")
LocalStrategy = require("passport-local");
//FacebookStrategy = require("passport-facebook");
Product = require("./models/product");
Comment = require("./models/comment");
User = require("./models/user");
seedDB = require("./seeds");


//get() FUNCTION TO RESPOND TO A SPECIFIC LINK OF THE WEBSITE
//IN THIS CASE OUR COMPUTER ACTS AS A SERVER ALSO
//IN THIS CASE THE LINK "/" IE http://localhost:(port)/
//req,res ARE PREDEFINED OBJECTS TO GET AND SEND DATA TO WEBSITE TO THE SERVER

//REQUIRING ROUTES
//ROUTES ARE IN DIFFERENT FILES TO MAKE THE CODE MORE READABLE
var productRoutes = require("./routes/products"),
	commentRoutes = require("./routes/comments"),
	indexRoutes = require("./routes/index");

//include mongoose in our project and open a connection to the 
//technomania database on our locally running instance of MongoDB
mongoose.connect("mongodb://localhost/technomania", {useNewUrlParser: true});


//https://www.npmjs.com/package/body-parser#bodyparserurlencodedoptions
app.use(bodyParser.urlencoded({extended:true}));


//WE CAN ALSO TELL THE SERVER TO ALWAYS LOOK FOR ONLY .ejs FILE IN VIEWS
//THIS CAN BE DONE THROUGH:-
//app.set("view engine","ejs");
//AFTER APPLYING THIS WE DON'T NEED TO WRITE ANY EXTENSION WITH THE FILES
app.set("view engine","ejs");



//seed db  
//seedDB();


//express.static() WILL TELL EXPRESS TO SERVE THE CONTENTS OF THE DIRECTORY
//THE DIRECTORY NAME IS PUBLIC
//IN WHICH WE USUALLY SAVE OUR STYLESHEETS AND JAVASCRIPT FILES
app.use(express.static(__dirname + "/public"))


app.use(methodOverride("_method"));
app.use(require("express-session")({
	secret:"cap is the best avenger",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); 



app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	next();
})




app.use(indexRoutes);
app.use(commentRoutes);
app.use(productRoutes);


//THIS PAGE WILL APPEAR IF ANY INCORRECT REQUEST IS MADE
app.get("*", function(req,res){
	res.render("404-Error");
});

//SERVER INIALIZATION COMMAND
//TELL EXPRESS TO LISTEN FOR REQUESTS(START SERVER)
//listen() IT LETS US USE THE BROWSER AT A PARTICULAR PORT NUMBER
//ONLY ON LOCAL BROWSER ie ON THE SAME MACHINE
app.listen(port,function(){
	console.log("SERVER HAS INITIATED")
});

