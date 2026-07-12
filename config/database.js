const mongoose = require("mongoose")
const { MONGOOSE_URI, DATABASE_NAME } = require("./config")

async function DataBaseConnection() {
    try {
        const conn = await mongoose.connect(MONGOOSE_URI, {
            dbName: DATABASE_NAME
        })
        console.log("Database connected with", conn.connection.host)

        // Production-safe drop index: check first if index exists before trying to drop it
        try {
            const indexes = await mongoose.connection.collection('users').indexes();
            const hasEmailIndex = indexes.some(idx => idx.name === 'email_1');
            if (hasEmailIndex) {
                await mongoose.connection.collection('users').dropIndex('email_1');
                console.log("Successfully dropped old unique email_1 index.");
            }
        } catch (e) {
            console.warn("Failed checking/dropping email_1 index:", e.message);
        }

        return true
    } catch (error) {
        if (error.name === "MongooseServerSelectionError") {
            console.log("Mongoose Server Selection Error")
        }
        console.log("DataBase Connection Error")
        return false
    }
}

module.exports = DataBaseConnection