// Import the "path" module from the Node.js core library
const path = require("path");

// Import the "express" module
const express = require("express");

// Import the "express-handlebars" module
const exphbs = require("express-handlebars");

// Create an instance of an Express app
const app = express();

// Set the port number for the app
const PORT = process.env.PORT || 3001;

// Import the sequelize connection
const sequelize = require("./config/connection");

// Create a new instance of the Express-Handlebars engine
const hbs = exphbs.create({});

// Import the "express-session" module
const session = require("express-session");

// Import the "connect-session-sequelize" module
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// Define a session configuration object
const sess = {
  secret: "Super secret secret", // This property specifies the secret used to sign the session ID cookie. It should be a string that is kept secret.
  cookie: {
  maxAge: 86400, // This property specifies the maximum age of the session cookie in milliseconds. In this case, it's set to 1 day (86400 seconds).
  },
  resave: false, // This property determines whether the session will be saved to the session store on every request, even if the session data has not changed. Setting it to false helps to optimize performance.
  saveUninitialized: false, // This property determines whether a new, uninitialized session will be saved to the session store. Setting it to false helps to comply with privacy laws and improves performance.
  store: new SequelizeStore({ // This property specifies the session store where the session data will be persisted. In this case, it's using Sequelize as the store.
  db: sequelize, // This property specifies the Sequelize database instance to use as the session store.
  }),
  };

// Use the session middleware
app.use(session(sess));

// Tell the Express app to use the handlebars engine and set the view engine to handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public"))); 

// Use the controllers for handling routes
app.use(require("./controllers"));

// Sync the sequelize models to the database and start the server
sequelize.sync({ force: false }).then(() => {
app.listen(PORT, () => {
console.log(`App listening on port http://localhost:${PORT}/ !`);
});
});