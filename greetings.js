module.exports = function greetFunction(existingNames) {
    //var nameList = existingNames || [];

    var namesList = {};
    namesList = existingNames
    var pool = existingNames;
    

    function greet(selectL, name) {
        //var name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
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
// storing names
    function setNames(name) {
        if (namesList[name] == undefined) {
            namesList[name] = 1;
        }
        else{
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


    // async function poolName(poolUser) {
    //     if (poolUser != '' && /^[a-zA-Z]+$/.test(poolUser)) {
    //         var name = poolUser[0].toUpperCase() + poolUser.slice(1).toLowerCase();
    //         const sql = await pool.query(`SELECT * FROM Users WHERE userName = $1`, [name]);
    //         if (sql.rows.length == 0) {
    //             await pool.query(`insert into Users (userName, greetedTimes) values ($1, $2)`, [name, 1]);
    //         } else {
    //             await pool.query(`UPDATE Users SET greetedTimes = greetedTimes + 1 WHERE userName = $1`, [name])
    //         }
    //     }
    // }
    // function emptyList() {
    //     emptyListnamesList = [];
    // }
    // async function poolTable(){
    //     const sqlCount = await pool.query("SELECT COUNT(*) FROM users");
    //     return sqlCount.rows[0].count;
    // }

    // async function greeted(){
    //     const sqlCount = await pool.query("SELECT * FROM users ORDER BY userName");
    //     return sqlCount.rows;
    // }

    // async function emptyDB() {
    //     await pool.query("DELETE FROM users")
    // }
    // async function getUserName(name){
    //     const sqldb = await pool.query("SELECT * FROM users WHERE userName = $1", [name])
    //     return sqldb.rows;
    // }
    // async function getnames(){

    //     return
    // }

    // async function getcounts(){

    //     return
    // }

    // async function updatecounts(){

    //     return
    // }

    // async function clearTable(){

    //     return
    // }




    return {
        greet,
        getNames,
        conditions,
        setNames,
        getCount,
        getList

    }

}

