module.exports = function greetFunction(existingNames) {

    var namesList = {};
    namesList = existingNames
    var pool = existingNames;
    const regex = /[a-zA-Z]$/g;


    function greet(selectL, name) {
        //var name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
        if (regex.test(name)) {
            setNames(name);
            if (selectL === "English") {
                return "Hi, " + name;
            }
            if (selectL === "Afrikaans") {
                return "Hallo, " + name;
            }
            if (selectL === "Isixhosa") {
                return "Molo, " + name;

            }
        }
    }
    // storing names
    function setNames(name) {

        if (namesList[name] == undefined) {
            namesList[name] = 1;
        }
        else {
            namesList[name]++
        }

    }

    function getCount() {
        return Object.keys(namesList).length;
    }

    function getNames() {
        return Object.keys(namesList)
    }

    function getList() {
        return namesList;
    }

    function conditions(name) {
        // name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
        const regex = /[a-zA-Z]$/g;

        if (name === "") {
            return 'Enter your name!';
        }
        if (!regex.test(name)) {
            return 'Only enter letters eg.John';
        }
    }
    //Using an Asynchronous Functions

    async function poolName(nameIn) {

        const db = await pool.query('SELECT * FROM greetedNames WHERE userName = $1', [nameIn]);

        if (db.rows.length == 0) {
            await pool.query('insert into greetedNames (userName, count) values ($1, $2)', [nameIn, 1]);
        } else {
            await pool.query('UPDATE greetedNames SET count = count + 1 WHERE userName = $1', [nameIn])
        }
    }

    // returns the table with all columns ordered by userName colunm
    async function all() {
        let db = await pool.query("SELECT username FROM greetedNames ORDER BY username");
        return db.rows;
    }

    //returns the count of names
    async function getForEach(name) {
        const db = await pool.query('SELECT count FROM greetedNames WHERE userName = $1', [name]);
        return db.rows[0].count;
    }

    //clears the entire table
    async function clearTable() {
        await pool.query("DELETE FROM greetedNames");
    }

    //this counts the rows in the table and returns it as a counter b
    async function countRows() {
        const db = await pool.query("SELECT COUNT(*) FROM greetedNames");
        return db.rows[0].count;
    }

    return {
        greet,
        getNames,
        conditions,
        setNames,
        getCount,
        getList,
        poolName,
        all,
        getForEach,
        clearTable,
        countRows
    }

}

