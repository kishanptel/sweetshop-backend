const mongoose = require("mongoose")
const { MONGOOSE_URI, DATABASE_NAME } = require("./config")

async function DataBaseConnection() {
    try {
        const conn = await mongoose.connect(MONGOOSE_URI, {
            dbName: DATABASE_NAME,
            useNewUrlPerser: true,
            useUnifinedTopology: true
        })
        console.log("Database connected with", conn.connection.host)
        return true
    } catch (error) {
        if (error.name === "MongooseServerSelectionError") {
            console.log("Mongoose Server Selection Error")
            process.exit(1)
        }
        console.log("DataBase Connection Error")
        process.exit(1)
        return false
    }
}

module.exports = DataBaseConnection