const { Router } = require("express");
const { signup, login, resetpassword, PatientProfile, PatientUpdate } = require("../controllers/PatientController");
const { Auth } = require("../middlewares/auth");
const PatientRoute = Router();

// register and log-in 
PatientRoute.post("/signup", signup);
PatientRoute.post("/login", login);

// change password
PatientRoute.patch("/ResetPassword",Auth, resetpassword);

// patient profile
PatientRoute.get("/patient-profile",Auth,PatientProfile);

// patient profile Update
PatientRoute.patch("/patient-profile-update/:id",Auth,PatientUpdate);

module.exports = PatientRoute;
