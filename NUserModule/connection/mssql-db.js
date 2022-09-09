const sql = require('mssql');
const dbConfig = require("../Utils/dbConfig");
const config = {
    user:dbConfig.MSSQL.USER,
    password:dbConfig.MSSQL.PASSWORD,
    server:dbConfig.MSSQL.SERVER,
    database:dbConfig.MSSQL.DB,
    port:dbConfig.MSSQL.PORT,
    options: {
        encrypt: false
    }
}

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to MSSQL');
        return pool;
    })
    .catch(err => {
        console.log('Database Connection Failed', err)
    })
    module.exports = {
        poolPromise
    }