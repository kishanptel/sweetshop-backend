const express = require("express")
const morgan = require("morgan")
const helmet = require("helmet")
const cors = require("cors")
const compression = require("compression")
const app = express()

const UserRoute = require("../modules/users/user.route.js")
const ContactRoute = require("../modules/contacts/contact.route.js")
const OrderRoute = require("../modules/orders/order.route.js")
const { default: rateLimit } = require("express-rate-limit")

const cookieParser = require("cookie-parser")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const allowedOrigins = [
    "http://localhost:5173",
    "https://cnc-frontend-sage.vercel.app",
    "https://cnc-admin-five.vercel.app"
]

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(helmet())
app.use(compression())
app.use(morgan('dev'))

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes in milliseconds
    limit: 100, // Limit each IP to 100 requests per `window`
    // message: 'Too many requests, please try again later.',
    // statusCode: 429 // HTTP status to return on limit
})

app.get("/", (req, res) => {
    res.send("Backend is running");
});

app.use("/users", limiter, UserRoute)
app.use("/contacts", limiter, ContactRoute)
app.use("/orders", limiter, OrderRoute)

module.exports = app
