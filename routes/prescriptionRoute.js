const { Router } = require("express");
const { DoctorAuth } = require("../middlewares/auth");
const {  allAppointment, PatientDetails } = require("../controllers/prescriptionController");

const PrescriptionRoute = Router();

// Today appointment
PrescriptionRoute.get("/AllAppointment",DoctorAuth,allAppointment);


// pateitn details
PrescriptionRoute.get("/SinglePatientDetails/:id", DoctorAuth,PatientDetails);
module.exports = PrescriptionRoute;
