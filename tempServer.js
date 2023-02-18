const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

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



const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const exp = require('constants')

const sess = {
  secret: 'secret secret',
  cookie: {
    maxAge: 86400,
  },
  SameSite: "none",
  resave: false, 
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sql,
  }),
};

app.use(session(sess))

app.use(require('./controllers'));

// sync sequelize models to the database, then turn on the server
sql.sync({ force : false }).then(()=> {
app.listen(PORT, () => {
  console.log(`App listening on port http://localhost:${PORT}/ 🚀`);
})
})