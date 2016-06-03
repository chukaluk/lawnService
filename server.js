const express = require('express');
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const favicon = require('serve-favicon');

var port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use("/css", express.static(__dirname + '/css'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/images", express.static(__dirname + '/images'));
app.use(favicon(__dirname + '/images/favicon.ico'));
app.set('view engine', 'ejs');

/*
 *  Setting up MongoDB to MongoLab
 *   
 *
 *
 */
MongoClient.connect('mongodb://test:lightnn21@ds015849.mlab.com:15849/crud-test', function(err, database) {
	if(err) return console.log(err);

	db = database;
	app.listen(port, function() {
		console.log('Listening on ' + port);
	});
});

/*
 *  SMTP Server Details
 *   
 *
 *
 */ 
var smtpTransport = nodemailer.createTransport("SMTP", {
	service: "Gmail",
	auth: {
		user: "grass.cutters.automated",
		pass: "heyyeh11",
	}
});

/*
 *  Dashboard view
 *   
 *  Initial admin page 
 *
 *
 */
app.get('/', (req, res) => {
		res.render('index.ejs');
});

/*
 *  The following routes all of the views for monthly billing (March - October)
 *   
 *  All of the customers are passed into the view to handle
 *
 *
 */
app.get('/billingMarch', (req, res) => {
	db.collection('customer').find().sort({sDate:1}).toArray((err, customers) => {
		if (err) return console.log(err);
		res.render('admin/billingMarch.ejs', {customers: customers});
	});
});

app.get('/billingApril', (req, res) => {
	db.collection('customer').find().sort({sDate:1}).toArray((err, customers) => {
		if (err) return console.log(err);
		res.render('admin/billingApril.ejs', {customers: customers});
	});
});

app.get('/billingMay', (req, res) => {
	db.collection('customer').find().sort({sDate:1}).toArray((err, customers) => {
		if (err) return console.log(err);
		res.render('admin/billingMay.ejs', {customers: customers});
	});
});

app.get('/billingJune', (req, res) => {
	db.collection('customer').find().sort({sDate:1}).toArray((err, customers) => {
		if (err) return console.log(err);
		res.render('admin/billingJune.ejs', {customers: customers});
	});
});

app.get('/billingJuly', (req, res) => {
	db.collection('customer').find().sort({sDate:1}).toArray((err, customers) => {
		if (err) return console.log(err);
		res.render('admin/billingJuly.ejs', {customers: customers});
	});
});

app.get('/billingAugust', (req, res) => {
	db.collection('customer').find().sort({sDate:1}).toArray((err, customers) => {
		if (err) return console.log(err);
		res.render('admin/billingAugust.ejs', {customers: customers});
	});
});

app.get('/billingSeptember', (req, res) => {
	db.collection('customer').find().sort({sDate:1}).toArray((err, customers) => {
		if (err) return console.log(err);
		res.render('admin/billingSeptember.ejs', {customers: customers});
	});
});

app.get('/billingOctober', (req, res) => {
	db.collection('customer').find().sort({sDate:1}).toArray((err, customers) => {
		if (err) return console.log(err);
		res.render('admin/billingOctober.ejs', {customers: customers});
	});
});




/*
 *  Responsible for sending emails, logs an error if one occurs
 *  or sends an acceptable response 
 *
 *
 */
app.get('/sent', (req, res) => {

	db.collection('customer').find().sort({sDate:1}).toArray((err, customers) => {
		if(err) return console.log(err);
		var mailOptions={
			to: req.query.to,
			subject: req.query.subject,
			createTextFromHtml: true,
			html: req.query.html

		}
		smtpTransport.sendMail(mailOptions, function(error, response){
			if(error) {
				console.log(error);
			} else {
				res.send("200");
			}
		});
	
	});
});

app.get('/sentBill', (req, res) => {

	db.collection('customer').find().sort({sDate:1}).toArray((err, customers) => {
		if(err) return console.log(err);
		var mailOptions={
			to: req.query.to,
			subject: req.query.subject,
			text: req.query.text

		}
		smtpTransport.sendMail(mailOptions, function(error, response){
			if(error) {
				console.log(error);
			} else {
				res.send("200");
			}
		});
	
	});
});


/*
 *  The following routes all of the views for weekly work (March - October)
 *   
 *  There are a total of 35 views (one for each week)
 *  All of the customers are passed to the view to handle
 *
 */
app.get('/weekOne', (req, res) => {
	db.collection('technician').find().toArray((err, techs) => {
		if(err) return console.log(err);
		db.collection('customer').find().toArray((err, customers) => {
			if (err) return console.log(err);
			res.render('admin/weekOne.ejs', {techs: techs, customers: customers});
		});
	});
});

app.get('/weekTwo', (req, res) => {
	db.collection('technician').find().toArray((err, techs) => {
		if(err) return console.log(err);
		db.collection('customer').find().toArray((err, customers) => {
			if (err) return console.log(err);
			res.render('admin/weekTwo.ejs', {techs: techs, customers: customers});
		});
	});
});

app.get('/weekThree', (req, res) => {
	db.collection('technician').find().toArray((err, techs) => {
		if(err) return console.log(err);
		db.collection('customer').find().toArray((err, customers) => {
			if (err) return console.log(err);
			res.render('admin/weekThree.ejs', {techs: techs, customers: customers});
		});
	});
});

app.get('/weekFour', (req, res) => {
	db.collection('technician').find().toArray((err, techs) => {
		if(err) return console.log(err);
		db.collection('customer').find().toArray((err, customers) => {
			if (err) return console.log(err);
			res.render('admin/weekFour.ejs', {techs: techs, customers: customers});
		});
	});
});

app.get('/weekFive', (req, res) => {
	db.collection('technician').find().toArray((err, techs) => {
		if(err) return console.log(err);
		db.collection('customer').find().toArray((err, customers) => {
			if (err) return console.log(err);
			res.render('admin/weekFive.ejs', {techs: techs, customers: customers});
		});
	});
});

app.get('/weekSix', (req, res) => {
	db.collection('technician').find().toArray((err, techs) => {
		if(err) return console.log(err);
		db.collection('customer').find().toArray((err, customers) => {
			if (err) return console.log(err);
			res.render('admin/weekSix.ejs', {techs: techs, customers: customers});
		});
	});
});

app.get('/weekSeven', (req, res) => {
	db.collection('technician').find().toArray((err, techs) => {
		if(err) return console.log(err);
		db.collection('customer').find().toArray((err, customers) => {
			if (err) return console.log(err);
			res.render('admin/weekSeven.ejs', {techs: techs, customers: customers});
		});
	});
});

app.get('/weekEight', (req, res) => {
	db.collection('technician').find().toArray((err, techs) => {
		if(err) return console.log(err);
		db.collection('customer').find().toArray((err, customers) => {
			if (err) return console.log(err);
			res.render('admin/weekEight.ejs', {techs: techs, customers: customers});
		});
	});
});

app.get('/weekNine', (req, res) => {
	db.collection('technician').find().toArray((err, techs) => {
		if(err) return console.log(err);
		db.collection('customer').find().toArray((err, customers) => {
			if (err) return console.log(err);
			res.render('admin/weekNine.ejs', {techs: techs, customers: customers});
		});
	});
});

app.get('/weekTen', (req, res) => {
	db.collection('technician').find().toArray((err, techs) => {
		if(err) return console.log(err);
		db.collection('customer').find().toArray((err, customers) => {
			if (err) return console.log(err);
			res.render('admin/weekTen.ejs', {techs: techs, customers: customers});
		});
	});
});

app.get('/weekEleven', (req, res) => {
	db.collection('technician').find().toArray((err, techs) => {
		if(err) return console.log(err);
		db.collection('customer').find().toArray((err, customers) => {
			if (err) return console.log(err);
			res.render('admin/weekEleven.ejs', {techs: techs, customers: customers});
		});
	});
});

app.get('/weekTwelve', (req, res) => {
	db.collection('technician').find().toArray((err, techs) => {
		if(err) return console.log(err);
		db.collection('customer').find().toArray((err, customers) => {
			if (err) return console.log(err);
			res.render('admin/weekTwelve.ejs', {techs: techs, customers: customers});
		});
	});
});

app.get('/weekThirteen', (req, res) => {
	db.collection('technician').find().toArray((err, techs) => {
		if(err) return console.log(err);
		db.collection('customer').find().toArray((err, customers) => {
			if (err) return console.log(err);
			res.render('admin/weekThirteen.ejs', {techs: techs, customers: customers});
		});
	});
});

app.get('/weekFourteen', (req, res) => {
	db.collection('technician').find().toArray((err, techs) => {
		if(err) return console.log(err);
		db.collection('customer').find().toArray((err, customers) => {
			if (err) return console.log(err);
			res.render('admin/weekFourteen.ejs', {techs: techs, customers: customers});
		});
	});
});

app.get('/weekFifteen', (req, res) => {
	db.collection('technician').find().toArray((err, techs) => {
		if(err) return console.log(err);
		db.collection('customer').find().toArray((err, customers) => {
			if (err) return console.log(err);
			res.render('admin/weekFifteen.ejs', {techs: techs, customers: customers});
		});
	});
});

app.get('/weekSixteen', (req, res) => {
	db.collection('technician').find().toArray((err, techs) => {
		if(err) return console.log(err);
		db.collection('customer').find().toArray((err, customers) => {
			if (err) return console.log(err);
			res.render('admin/weekSixteen.ejs', {techs: techs, customers: customers});
		});
	});
});

app.get('/weekSeventeen', (req, res) => {
	db.collection('technician').find().toArray((err, techs) => {
		if(err) return console.log(err);
		db.collection('customer').find().toArray((err, customers) => {
			if (err) return console.log(err);
			res.render('admin/weekSeventeen.ejs', {techs: techs, customers: customers});
		});
	});
});

app.get('/weekEighteen', (req, res) => {
	db.collection('technician').find().toArray((err, techs) => {
		if(err) return console.log(err);
		db.collection('customer').find().toArray((err, customers) => {
			if (err) return console.log(err);
			res.render('admin/weekEighteen.ejs', {techs: techs, customers: customers});
		});
	});
});

app.get('/weekNineteen', (req, res) => {
	db.collection('technician').find().toArray((err, techs) => {
		if(err) return console.log(err);
		db.collection('customer').find().toArray((err, customers) => {
			if (err) return console.log(err);
			res.render('admin/weekNineteen.ejs', {techs: techs, customers: customers});
		});
	});
});

app.get('/weekTwenty', (req, res) => {
	db.collection('technician').find().toArray((err, techs) => {
		if(err) return console.log(err);
		db.collection('customer').find().toArray((err, customers) => {
			if (err) return console.log(err);
			res.render('admin/weekTwenty.ejs', {techs: techs, customers: customers});
		});
	});
});

app.get('/weekTwentyOne', (req, res) => {
	db.collection('technician').find().toArray((err, techs) => {
		if(err) return console.log(err);
		db.collection('customer').find().toArray((err, customers) => {
			if (err) return console.log(err);
			res.render('admin/weekTwentyOne.ejs', {techs: techs, customers: customers});
		});
	});
});

app.get('/weekTwentyTwo', (req, res) => {
	db.collection('technician').find().toArray((err, techs) => {
		if(err) return console.log(err);
		db.collection('customer').find().toArray((err, customers) => {
			if (err) return console.log(err);
			res.render('admin/weekTwentyTwo.ejs', {techs: techs, customers: customers});
		});
	});
});

app.get('/weekTwentyThree', (req, res) => {
	db.collection('technician').find().toArray((err, techs) => {
		if(err) return console.log(err);
		db.collection('customer').find().toArray((err, customers) => {
			if (err) return console.log(err);
			res.render('admin/weekTwentyThree.ejs', {techs: techs, customers: customers});
		});
	});
});

app.get('/weekTwentyFour', (req, res) => {
	db.collection('technician').find().toArray((err, techs) => {
		if(err) return console.log(err);
		db.collection('customer').find().toArray((err, customers) => {
			if (err) return console.log(err);
			res.render('admin/weekTwentyFour.ejs', {techs: techs, customers: customers});
		});
	});
});

app.get('/weekTwentyFive', (req, res) => {
	db.collection('technician').find().toArray((err, techs) => {
		if(err) return console.log(err);
		db.collection('customer').find().toArray((err, customers) => {
			if (err) return console.log(err);
			res.render('admin/weekTwentyFive.ejs', {techs: techs, customers: customers});
		});
	});
});

app.get('/weekTwentySix', (req, res) => {
	db.collection('technician').find().toArray((err, techs) => {
		if(err) return console.log(err);
		db.collection('customer').find().toArray((err, customers) => {
			if (err) return console.log(err);
			res.render('admin/weekTwentySix.ejs', {techs: techs, customers: customers});
		});
	});
});

app.get('/weekTwentySeven', (req, res) => {
	db.collection('technician').find().toArray((err, techs) => {
		if(err) return console.log(err);
		db.collection('customer').find().toArray((err, customers) => {
			if (err) return console.log(err);
			res.render('admin/weekTwentySeven.ejs', {techs: techs, customers: customers});
		});
	});
});

app.get('/weekTwentyEight', (req, res) => {
	db.collection('technician').find().toArray((err, techs) => {
		if(err) return console.log(err);
		db.collection('customer').find().toArray((err, customers) => {
			if (err) return console.log(err);
			res.render('admin/weekTwentyEight.ejs', {techs: techs, customers: customers});
		});
	});
});

app.get('/weekTwentyNine', (req, res) => {
	db.collection('technician').find().toArray((err, techs) => {
		if(err) return console.log(err);
		db.collection('customer').find().toArray((err, customers) => {
			if (err) return console.log(err);
			res.render('admin/weekTwentyNine.ejs', {techs: techs, customers: customers});
		});
	});
});

app.get('/weekThirty', (req, res) => {
	db.collection('technician').find().toArray((err, techs) => {
		if(err) return console.log(err);
		db.collection('customer').find().toArray((err, customers) => {
			if (err) return console.log(err);
			res.render('admin/weekThirty.ejs', {techs: techs, customers: customers});
		});
	});
});

app.get('/weekThirtyOne', (req, res) => {
	db.collection('technician').find().toArray((err, techs) => {
		if(err) return console.log(err);
		db.collection('customer').find().toArray((err, customers) => {
			if (err) return console.log(err);
			res.render('admin/weekThirtyOne.ejs', {techs: techs, customers: customers});
		});
	});
});

app.get('/weekThirtyTwo', (req, res) => {
	db.collection('technician').find().toArray((err, techs) => {
		if(err) return console.log(err);
		db.collection('customer').find().toArray((err, customers) => {
			if (err) return console.log(err);
			res.render('admin/weekThirtyTwo.ejs', {techs: techs, customers: customers});
		});
	});
});

app.get('/weekThirtyThree', (req, res) => {
	db.collection('technician').find().toArray((err, techs) => {
		if(err) return console.log(err);
		db.collection('customer').find().toArray((err, customers) => {
			if (err) return console.log(err);
			res.render('admin/weekThirtyThree.ejs', {techs: techs, customers: customers});
		});
	});
});

app.get('/weekThirtyFour', (req, res) => {
	db.collection('technician').find().toArray((err, techs) => {
		if(err) return console.log(err);
		db.collection('customer').find().toArray((err, customers) => {
			if (err) return console.log(err);
			res.render('admin/weekThirtyFour.ejs', {techs: techs, customers: customers});
		});
	});
});

app.get('/weekThirtyFive', (req, res) => {
	db.collection('technician').find().toArray((err, techs) => {
		if(err) return console.log(err);
		db.collection('customer').find().toArray((err, customers) => {
			if (err) return console.log(err);
			res.render('admin/weekThirtyFive.ejs', {techs: techs, customers: customers});
		});
	});
});



/*
 *  Handles the first time the addCustomer view is loaded
 *   
 *  All of the customers are passed into the view to handle
 *
 *
 */
app.get('/addCustomer', (req, res) => {
	db.collection('customer').count({}, function(err, count) {
		res.render('admin/addCustomer.ejs', {count: count});
	});
	
});


/*
 *  Handles the submission of the addCustomer form and renders the
 *  view with an appropriate response message (allows for adding multiple
 *  customers without going back to the dashboard or reloading the page)
 */
app.post('/addCustomer', (req, res) => {
	db.collection('customer').save(req.body, function(err, result) {
		db.collection('customer').count({}, function(err, count) {
			if(err) {
				res.render('admin/addCustomer', {message: 'Unable to add Customer'});
			} else {
				res.render('admin/addCustomer', {message: 'Customer Added!', count: count});
			}
		});
	});
});


/*
 *  Testing view  
 *  
 *  Handles different tests
 *
 */
app.get('/test', (req, res) => {
	db.collection('technician').find().toArray((err, techs) => {
		if(err) return console.log(err);
		db.collection('customer').find().toArray((err, customers) => {
			if (err) return console.log(err);
			res.render('admin/test.ejs', {techs: techs, customers: customers});
		});
	});
});

