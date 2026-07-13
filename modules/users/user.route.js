const express = require("express")
const upload = require("../../middlewares/multer.middleware")
const { UserRegister, UserLogin, UpdateAdminCredentials, CreateNewAdmin, GetAllUsers, DeleteUser, CheckSession, UserLogout } = require("./user.controller")
const route = express.Router()

route.post("/register", upload.single("file"), UserRegister)
route.post("/login", UserLogin)
route.post("/logout", UserLogout)
route.get("/me", CheckSession)
route.put("/admin/update", UpdateAdminCredentials)
route.post("/admin/create", CreateNewAdmin)
route.get("/all", GetAllUsers)
route.delete("/delete/:id", DeleteUser)

module.exports = route