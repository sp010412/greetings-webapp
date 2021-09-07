module.exports = function greetFunction(existingNames) {

    var namesList = {};
    namesList = existingNames
    var pool = existingNames;
    const regex = /^[A-Za-z]+$/;

    function greet(selectL, name) {
        var upper = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
        if (regex.test(upper)) {
            setNames(upper);
            if (selectL === "English") {
                return "Hi, " + upper;
            }
            if (selectL === "Afrikaans") {
                return "Hallo, " + upper;
            }
            if (selectL === "Isixhosa") {
                return "Molo, " + upper;

            }
        }
    }
    // storing names
    function setNames(string) {
        if (string != '' && /^[a-zA-Z]+$/.test(string)) {
            var name = string[0].toUpperCase() + string.slice(1).toLowerCase();
            if (namesList[name] == undefined) {
                namesList[name] = 1;
            }
            else {
                namesList[name]++
            }
        }
    }

    //Using an Asynchronous Functions

    async function poolName(poolUser) {

        if (poolUser != '' && /^[a-zA-Z]+$/.test(poolUser)) {
            var nameIn = poolUser[0].toUpperCase() + poolUser.slice(1).toLowerCase();

            const db = await pool.query('SELECT * FROM greetedNames WHERE userName = $1', [nameIn]);

            if (db.rows.length == 0) {
                await pool.query('insert into greetedNames (userName, count) values ($1, $2)', [nameIn, 1]);
            } else {
                await pool.query('UPDATE greetedNames SET count = count + 1 WHERE userName = $1', [nameIn])
            }
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
        setNames,
        poolName,
        all,
        getForEach,
        clearTable,
        countRows
    }

}

