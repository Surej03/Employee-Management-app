const knex  = require('knex');
const condb = knex({
    client:"mysql",
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'Aadharv17@#',
        database: 'empMgmt',
        port: 3306,
        multipleStatements: true
    },
    pool: {
        min:1,
        max:10
    },
});

module.exports = condb;