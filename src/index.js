const { PORT } = require("../config/config")
const DataBaseConnection = require("../config/database")
const app = require("./app")
const UserModel = require("../modules/users/user.model")

async function ServerStart() {
    let inConnected = false

    try {
        if (!isConnected) {
            const connected = await DataBaseConnection()
            inConnected = true
            if (!connected) {
                console.log("Database error check database connection...")
            } else {
                // Seed Admin user
                try {
                    const adminExist = await UserModel.findOne({ isAdmin: true })
                    if (!adminExist) {
                        const admin = new UserModel({
                            name: "Admin",
                            email: "admin@sweetshop.in",
                            password: "admin123",
                            isAdmin: true,
                            profile: "/sweet_shop_logo.png"
                        })
                        await admin.save()
                        console.log("Admin account successfully seeded in database.")
                    }
                } catch (seedErr) {
                    console.error("Failed to seed admin account:", seedErr.message)
                }
            }
        }
        return app(req, res, next)
    } catch (error) {
        console.log("Startup Error", error.message)
    }
}

ServerStart()