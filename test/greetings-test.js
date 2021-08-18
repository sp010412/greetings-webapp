
const assert = require('assert');
const greetFunction = require("../greetings");

describe('greetings', function () {
    it('it should get names set', function () {
        let tests = greetFunction()
        tests.setNames("saneliswa")


        assert.equal(tests.getNames(), "saneliswa");
    });

    it('it should prevent duplication of names from being counted ', function () {
        let tests = greetFunction()
        tests.setNames("saneliswa")
        tests.setNames("saneliswa")
        tests.setNames("patience")
        tests.setNames("nande")

        assert.equal(tests.getCount(), 3);
    });

    it('it should greet in English', function () {
        let tests = greetFunction()
        assert.equal(tests.greet("English", "Saneliswa"), "Hi, Saneliswa");
    });
    it('it should greet in Afrikaans ', function () {
        let tests = greetFunction()
        assert.equal(tests.greet("Afrikaans", "Saneliswa"), "Hallo, Saneliswa");
    });
    it('it should greet in Isixhosa', function () {
        let tests = greetFunction()
        assert.equal(tests.greet("Isixhosa", "Saneliswa"), "Molo, Saneliswa");
    });

    it('it should not accept numbers', function () {
        let tests = greetFunction()
        
        assert.equal(tests.conditions("552"), 'Only enter letters eg.John');

    });
    it('it should not accept empty spaces', function () {
        let tests = greetFunction()
        
        assert.equal(tests.conditions(""), 'Enter your name!');

    });

});