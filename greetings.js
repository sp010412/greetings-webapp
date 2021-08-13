module.exports = function greetFunction(existingNames) {
    var nameList = existingNames || [];

    function storeNames(name) {
        var name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
        if (!nameList.includes(name)) {
            nameList.push(name);
        } else {
            return
        }
    }

    function greet(selectL, name) {
        var name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
        if (selectL === "English") {
            return "Hi, " + name;
        }
        else if (selectL === "Afrikaans") {
            return "Hallo, " + name;
        }
        else if (selectL === "Isixhosa") {
            return "Molo, " + name;
        }
    }

    function counter() {
        return nameList.length
    }

    function getNames() {
        return nameList
    }

    function conditions(name) {
        name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
        const regex = /[a-zA-Z]$/g;

        if (name === "") {
            return 'Enter your name!';
        }
        if (!regex.test(name)) {
            return 'Only enter letters eg.John';
        }
    }

    return {
        greet,
        counter,
        storeNames,
        getNames,
        conditions,
    }

}

