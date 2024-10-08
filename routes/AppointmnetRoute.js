const { Router } = require("express");
const { createAppointment, AllAppointment, UpdateAppointment, DeleteAppointment, getPatientAppointmentHistory, getDoctorAppointmentHistory } = require("../controllers/AppointmentController");
const { Auth, DoctorAuth } = require("../middlewares/auth");

const AppointmentRoute = Router();

AppointmentRoute.post("/create-appointment",Auth,createAppointment);

AppointmentRoute.get("/All-Appointments",Auth,AllAppointment);

AppointmentRoute.patch("/Update-Appointments/:id",Auth,UpdateAppointment);

AppointmentRoute.delete("/Delete-Appointments/:id",Auth,DeleteAppointment);


 // Fetch appointment history for a patient
 AppointmentRoute.get("/Patient-Appointment-History/:PatientID",Auth,getPatientAppointmentHistory);

 // Fetch appointment history for a doctor
AppointmentRoute.get("/Doctor-Appointment-History/:DoctorID",DoctorAuth,getDoctorAppointmentHistory);



module.exports = AppointmentRoute;

