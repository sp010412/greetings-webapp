const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const greetFunction = require("./greetings");
const flash = require('express-flash');
const session = require('express-session');
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

app.get('/', async function (req, res) {
    res.render('index', {
        count: await greetInsta.countRows()
    })
});


app.post('/', async function (req, res) {

    try {
        var name = req.body.inputBox;
        var language = req.body.selected;
        var out = greetInsta.greet(language, name);
        // var count = await greetInsta.countRows();
        const regex = /^[A-Za-z]+$/;
        if (regex.test(name) && language) {    
                await greetInsta.poolName(name);
                await greetInsta.countRows()
        }
        
        else if (!name && !language) {
            req.flash('info', 'Enter your name and select a language!');
        }
        else if (!language && name) {
            req.flash('info', 'Select a preferred language!');
        }
        else if (!name) {
            req.flash('info', 'Enter your name!');
        }
        
        else if (!regex.test(name)) {
            req.flash('info', 'Only enter letters eg.John');
        }
    
        res.render('index', {
            output: out,
            count: await greetInsta.countRows()

        });
    } catch (err) {
        console.log(err)
    }
});

app.get("/greeted", async function (req, res) {
    res.render("greeted", { greeted: await greetInsta.all() });
});

app.get('/greeted/:username', async function (req, res) {

    var name = req.params.username;
    var nameCount = await greetInsta.getForEach(name)

    // var allNames = greetInsta.getList();
    // var allNames = await greetInsta.getForEach(name);
    // res.render("counter", { greetedName: name, nameCount: allNames[name] });
    res.render("counter", {
        name,
        nameCount
    });
});

app.post('/resetButton', async function (req, res) {
    req.flash('infoIn', 'Database is successfully cleared!');
    await greetInsta.clearTable();
    res.redirect('/');
});

app.post('/home', async function (req, res) {
    res.redirect('/');
});

app.post('/previous', async function (req, res) {
    res.redirect('/greeted');
});


const PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
    console.log("App started at port:", PORT)
});