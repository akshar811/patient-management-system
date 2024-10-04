require("dotenv").config();

const express = require("express");
const connect = require("./config/db");
const cookie = require("cookie-parser");
const PatientRoute = require("./routes/PatientRoute");
const AdminRoute = require("./routes/AdminRoute");
const DoctorRoute = require("./routes/DoctorRoute");
const AppointmentRoute = require("./routes/AppointmnetRoute");
const PrescriptionRoute = require("./routes/prescriptionRoute");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookie());

app.use("/patient",PatientRoute);
app.use("/Admin",AdminRoute);
app.use("/Doctor",DoctorRoute);
app.use("/Appointment",AppointmentRoute);
app.use("/prescription",PrescriptionRoute);

app.listen(process.env.PORT, () => {
  connect();
  console.log(`port is running ${process.env.PORT}`);
});
