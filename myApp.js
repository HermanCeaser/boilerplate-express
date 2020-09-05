var express = require("express");

const path = require("path");
const bodyParser = require('body-parser');

var app = express();

// --> 7)  Mount the Logger middleware here

// --> 11)  Mount the body-parser middleware  here

/** 1) Meet the node console. */
console.log("Hello World");


/** 2) A first working Express Server 
app.get('/', (req,res)=>{
  res.send('Hello Express');
})*/

// BodyParser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/** 7) Root-level Middleware - A logger */
//  place it before all the routes !
// Root Level Logger Middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
})

/** 3) Serve an HTML file */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views", "index.html"));
});

/** 4) Serve static assets  */
app.use(express.static(path.join(__dirname, 'public')));

/** 5) serve JSON on a specific route */
app.get("/json", (req, res) => {
  let message = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }
  res.json({ message });
})

/** 6) Use the .env file to configure the app */


/** 8) Chaining middleware. A Time server */
app.get("/now", (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json({ time: req.time });
})

/** 9)  Get input from client - Route parameters */
app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
})

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>

app.get("/name", (req, res) => {
  let { first, last } = req.query;
  res.json({
    name: `${first} ${last}`
  })
});

app.post("/name", (req, res) => {
  let { first, last } = req.body;
  res.json({
    name: `${first} ${last}`
  })
})
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !

/** 12) Get data form POST  */

// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

module.exports = app;
