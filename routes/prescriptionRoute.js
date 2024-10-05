const { Router } = require("express");
const { DoctorAuth } = require("../middlewares/auth");
const {  allAppointment, PatientDetails, AddPriscription, getPrescription, getTodaysPrescriptions, getOldPrescriptions, searchPrescriptionsByPatientName, getPrescriptionsByDate, SinglePrescription } = require("../controllers/prescriptionController");

const PrescriptionRoute = Router();

// Today appointment
PrescriptionRoute.get("/AllAppointment",DoctorAuth,allAppointment);

// pateitn details
PrescriptionRoute.get("/SinglePatientDetails/:id", DoctorAuth,PatientDetails);

//create Prescription
PrescriptionRoute.post("/CreatePrescription/:id",DoctorAuth,AddPriscription)

//get Prescription
PrescriptionRoute.get("/getCreatePrescription/:id",DoctorAuth,getPrescription)



// Get Today's Prescriptions (ignoring time)
PrescriptionRoute.get("/todayPrescription",DoctorAuth, getTodaysPrescriptions);

// Get Old Prescriptions (before today, ignoring time)
PrescriptionRoute.get("/oldPrescription",DoctorAuth, getOldPrescriptions);


// Get Prescriptions for a Specific Date
PrescriptionRoute.get("/searchingdate",DoctorAuth, getPrescriptionsByDate);

//single Prescription
PrescriptionRoute.get("/SinglePrescription/:id", DoctorAuth,SinglePrescription)


module.exports = PrescriptionRoute;
