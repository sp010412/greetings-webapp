
const assert = require('assert');
const greetFunction = require("../greetings");
const pg = require("pg");
const Pool = pg.Pool;


const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/travis_ci_test';

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

describe('greetings', async function () {

    it('it should greet in English', function () {
        let tests = greetFunction(pool)
        assert.equal(tests.greet("English", "Saneliswa"), "Hi, Saneliswa");
    });
    it('it should greet in Afrikaans ', function () {
        let tests = greetFunction(pool)
        assert.equal(tests.greet("Afrikaans", "Saneliswa"), "Hallo, Saneliswa");
    });
    it('it should greet in Isixhosa', function () {
        let tests = greetFunction(pool)
        assert.equal(tests.greet("Isixhosa", "Saneliswa"), "Molo, Saneliswa");
    });

    it('Should return the greeted userName', async function () {
        let tests = greetFunction(pool)
        await tests.poolName('Saneliswa');
        var userName = await tests.all('Saneliswa')
        assert.equal('Saneliswa', userName[0].username);
        await tests.clearTable();

    });

    it('Should count the names of all greeted users', async function () {
        let tests = greetFunction(pool)
        await tests.poolName('Saneliswa');
        await tests.poolName('Emihle');
        await tests.poolName('Edna');

        await tests.all('Saneliswa');
        await tests.all('Emihle');
        await tests.all('Edna');

        assert.equal(3, await tests.countRows());
        await tests.clearTable();
    });


    it('Should get the total count for each name ', async function () {
        let tests = greetFunction(pool)
        await tests.poolName('Saneliswa');
        await tests.poolName('Saneliswa');
        await tests.poolName('Zama');
        await tests.poolName('Saneliswa');

        await tests.all('Saneliswa');
        await tests.all('Zama');

        assert.equal(3, await tests.getForEach('Saneliswa'));
        assert.equal(1, await tests.getForEach('Zama'));
        await tests.clearTable();
    });

    it('should delete from greetings database', async function () {
        let tests = greetFunction(pool)
        await tests.clearTable();
        assert.equal(0, await tests.all())

    });

});