const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const greetFunction = require("./greetings");
const flash = require('express-flash');
const session = require('express-session');
const routes = require('./routs')
const app = express();

const handlebarSetup = exphbs({
    partialsDir: "./views/partials",
    viewPath: './views',
    layoutsDir: './views/layouts',
});

const pg = require("pg");
const Pool = pg.Pool;

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/greetings';

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});
const greetInsta = greetFunction(pool);
const Routes = routes(greetInsta)

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));
app.use(flash());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())


//Routes
app.get('/', Routes.home);

app.post('/', Routes.actions);

app.get("/greeted", Routes.list);

app.get('/greeted/:username', Routes.greetedTimes);

app.post('/resetButton', Routes.remove);

app.post('/home', Routes.homeBtn);

app.post('/previous', Routes.previousBtn);


const PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
    console.log("App started at port:", PORT)
});