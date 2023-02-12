const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session')

const app = express();
const PORT = process.env.PORT || 3001;

// import sequelize connection
const sql = require("./config/connection")

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

app.use(require('./controllers'));

// sync sequelize models to the database, then turn on the server
sql.sync({ force : false }).then(()=> {
app.listen(PORT, () => {
  console.log(`App listening on port http://localhost:${PORT}/ 🚀`);
})
})