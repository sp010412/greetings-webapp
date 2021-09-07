module.exports = function (greetInsta) {


    async function home(req, res) {
        res.render('index', {
            count: await greetInsta.countRows()
        })
    }

    async function actions(req, res) {

        try {
            var name = req.body.inputBox;
            var language = req.body.selected;
            var output = greetInsta.greet(language, name);
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
                count: await greetInsta.countRows(),
                output: output

            });
        } catch (err) {
            console.log(err)
        }
    }

    async function list (req, res) {
        res.render("greeted", { greeted: await greetInsta.all() });
    }

    async function greetedTimes(req, res) {

        var name = req.params.username;
        var nameCount = await greetInsta.getForEach(name)
    
        res.render("counter", {
            name,
            nameCount
        });
    }

    async function remove (req, res) {
        req.flash('infoIn', 'Database is successfully cleared!');
        await greetInsta.clearTable();
        res.redirect('/');
    }
    
    async function homeBtn(req, res) {
        res.redirect('/');
    }

    async function previousBtn (req, res) {
        res.redirect('/greeted');
    }



    return {
        home,
        actions,
        list,
        greetedTimes,
        remove,
        homeBtn,
        previousBtn
    }
}