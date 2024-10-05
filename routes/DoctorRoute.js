const { Router } = require("express");
const { doctorLogin, resetpassword, DoctorProfile, EditProfile, SinglePatient, AppoinmentRecord, allPatients } = require("../controllers/DoctorController");
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

//  Appoinment Record
DoctorRoute.get("/AppoinmentRecord",DoctorAuth,AppoinmentRecord);

// single patient details
DoctorRoute.get("/SinglePatient/:id",DoctorAuth,SinglePatient);

// all patient
DoctorRoute.get("/AllPatients",DoctorAuth,allPatients);

module.exports = DoctorRoute;
