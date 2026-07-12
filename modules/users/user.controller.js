const UserModel = require("./user.model")
const cloudinary = require("../../config/cloudinary.js")
const streamifier = require("streamifier")
const sendWelcomeEmail = require("../../services/sendWelcomeEmail")

const UserRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(401).json({ message: "All fields required!" })
        }

        const existingUser = await UserModel
            .findOne({ email, isAdmin: { $ne: true } })

        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email address." });
        }

        let profileUrl = "/sweet_shop_logo.png"

        if (req.file) {
            const profile = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: "user_profile",
                        public_id: `${Date.now()}`
                    },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                );

                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });

            profileUrl = profile.secure_url;
        }

        const newUser = new UserModel({
            name,
            email,
            password,
            profile: profileUrl
        })

        const Data = await newUser.save()

        // Send welcome email in background
        // sendWelcomeEmail(email, name).catch(err => console.log("Welcome email sending failed:", err.message));
        await sendWelcomeEmail(email, name)

        res.status(201).json({
            success: true,
            message: "User Registered successfully...",
            Data
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const UserLogin = async (req, res) => {
    try {
        const { email, password, isAdmin } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "All fields required!" })
        }

        const query = { email }
        if (isAdmin === true) {
            query.isAdmin = true
        } else {
            query.isAdmin = { $ne: true }
        }

        const user = await UserModel.findOne(query)
        if (!user) {
            return res.status(404).json({ message: "User not found!" })
        }

        const isMatch = await user.comparePassword(password)
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials!" })
        }

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            Data: user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const UpdateAdminCredentials = async (req, res) => {
    try {
        const { email, password } = req.body
        const adminUser = await UserModel.findOne({ isAdmin: true })
        if (!adminUser) {
            return res.status(404).json({ success: false, message: "Admin account not found!" })
        }
        if (email && email !== adminUser.email) {
            const emailInUse = await UserModel.findOne({ email, isAdmin: true })
            if (emailInUse) {
                return res.status(400).json({ success: false, message: "Email is already taken by another admin account!" })
            }
            adminUser.email = email
        }
        if (password) adminUser.password = password
        await adminUser.save()
        res.status(200).json({
            success: true,
            message: "Admin credentials updated successfully!",
            admin: {
                name: adminUser.name,
                email: adminUser.email,
                isAdmin: true,
                profile: adminUser.profile
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const GetAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find({ isAdmin: { $ne: true } }, { password: 0 }).sort({ createdAt: -1 })
        res.status(200).json({
            success: true,
            users
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const CreateNewAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields required!" })
        }

        const existingUser = await UserModel.findOne({ email, isAdmin: true })
        if (existingUser) {
            return res.status(400).json({ success: false, message: "An admin user already exists with this email address." })
        }

        const newAdmin = new UserModel({
            name,
            email,
            password,
            profile: "https://sweetshop-frontend-orcin.vercel.app/sweet_shop_logo.png",
            isAdmin: true
        })

        await newAdmin.save()
        res.status(201).json({
            success: true,
            message: "New Administrator created successfully!",
            admin: {
                name: newAdmin.name,
                email: newAdmin.email,
                isAdmin: true,
                profile: newAdmin.profile
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const DeleteUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await UserModel.findByIdAndDelete(id)
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found!" })
        }
        res.status(200).json({
            success: true,
            message: "User account deleted successfully!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = { UserRegister, UserLogin, UpdateAdminCredentials, CreateNewAdmin, GetAllUsers, DeleteUser }