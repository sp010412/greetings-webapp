const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const greetFunction = require("./greetings");
const flash = require('express-flash');
const session = require('express-session');
const app = express();
const greetInsta = greetFunction();
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
    ssl: useSSL
});


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

app.get('/', function (req, res) {
    res.render('index');
});

app.post('/', async function (req, res) {

    try {
    var name = req.body.inputBox;
    var language = req.body.selected;
    var output = greetInsta.greet(language, name);
    var count = greetInsta.getCount();
    const regex = /[a-zA-Z]$/g;

    if (name === '') {
        req.flash('info', 'Enter your name!');
    }
    else if (!regex.test(name)) {
        req.flash('info', 'Only enter letters eg.John');
    }

    await pool.query('INSERT INTO greetednames (userName, count) VALUES ($1,$2)', [name,count]);

    res.render('index', {
        output,
        count,
    });
}catch (err){
    console.log(err)
}

});

app.get("/greeted", function (req, res) {
    res.render("greeted", { greeted: greetInsta.getNames() });
});

app.get('/greeted/:inputBox', function (req, res) {
    var name = req.params.inputBox;
    var allNames = greetInsta.getList();
    res.render("counter", { greetedName: name, nameCount: allNames[name] });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
    console.log("App started at port:", PORT)
});