const { Router } = require("express");
const { doctorLogin, resetpassword, DoctorProfile, EditProfile, PatientRecord, SinglePatient } = require("../controllers/DoctorController");
const { DoctorAuth } = require("../middlewares/auth");


const DoctorRoute = Router();

// dcotor log in 
DoctorRoute.post("/Doctor-Login",doctorLogin);

// doctor get profile
DoctorRoute.get("/Doctor-Profile",DoctorAuth,DoctorProfile);

// Doctor edit profile
DoctorRoute.patch("/Doctor-Edit/:id",DoctorAuth,EditProfile);


// change password
DoctorRoute.patch("/resetpassword",DoctorAuth,resetpassword);

//  patiend Record
DoctorRoute.get("/PatientRecord",DoctorAuth,PatientRecord);

// single patient details
DoctorRoute.get("/SinglePatient/:PatientID",DoctorAuth,SinglePatient);




module.exports = DoctorRoute;
