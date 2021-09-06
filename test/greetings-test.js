
const assert = require('assert');
const greetFunction = require("../greetings");
const pg = require("pg");
const Pool = pg.Pool;


const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/greetings';

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

// const testsInsta = greetFunction(pool);

describe('greetings', async function () {
    beforeEach(async function () {
        await pool.query("delete from greetednames;");
    });

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

    it('should delete from greetings database', async function () {
        let tests = greetFunction(pool)
        await tests.clearTable();
        assert.equal(0, await tests.all())
    })

    it('Should return the greeted userName', async function () {
        let tests = greetFunction(pool)
        await tests.poolName('Worthy');
        var userName = await tests.all('Worthy')
        assert.equal('Worthy', userName[0].username)
        
    })

    it('Should count the names of all greeted users', async function () {
        let tests = greetFunction(pool)
        await tests.poolName('Worthy');
        await tests.poolName('Owethu');
        await tests.poolName('Ethu');

        await tests.all('Worthy');
        await tests.all('Owethu');
        await tests.all('Ethu');

        assert.equal(3, await tests.countRows());
    })
        
    after(function () {
        pool.end();
    });

});