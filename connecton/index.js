const mysql2 = require("mysql2/promise");

async function main() {
    return await mysql2.createConnection({
        host: "localhost",
        user: "root",
        database: "employee_tracker_db",
        password: "root123",
    });

}


module.exports = main()