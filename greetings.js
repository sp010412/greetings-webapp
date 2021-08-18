module.exports = function greetFunction(existingNames) {
    //var nameList = existingNames || [];

    var namesList = {}

    // function storeNames(name) {
    //     // var name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
    //     if (!namesList.includes(name)) {
    //         namesList.push(name);
    //     } else {
    //         return
    //     }
    // }

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

    // function counter() {
    //     return nameList.length
    // }

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

    return {
        greet,
        // counter,
        // storeNames,
        getNames,
        conditions,
        setNames,
        getCount,
        getList

    }

}

