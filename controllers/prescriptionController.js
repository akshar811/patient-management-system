const appointmentModel = require("../models/AppointmentModel");
const prescriptionModel = require("../models/prescriptionModel");

// Today appointment
const allAppointment = async (req, res) => {
  try {
    const allPresciption = await appointmentModel
      .find({ DoctorID: req.body.DoctorID })
      .populate("PatientID", "firstname lastname age gender");
    res.status(200).json(allPresciption);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// patient details
const PatientDetails = async (req, res) => {
  try {
    let { id } = req.params;
    const SingleAppoiment = await appointmentModel
      .findById(id)
      .populate({
        path: "PatientID",
        select: "firstname lastname phonenumber gender age address",
      })
      .populate({ path: "DoctorID", select: "DoctorName" });
    res.json(SingleAppoiment);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error.message });
  }
};

//Create Prescription
const AddPriscription = async (req, res) => {
  try {
    let { id } = req.params;
    let { medications, note } = req.body;
    if (id) {
      let Appointment = await appointmentModel
        .findById(id)
        .populate({ path: "PatientID", select: "id" });
      // console.log(Appointment.PatientID.id);

      const prescription = new prescriptionModel({
        PatientID: Appointment.PatientID._id, // Ensure you're setting the ObjectId
        DoctorID: Appointment.DoctorID._id, // Ensure you're setting the ObjectId
        AppointmentID: Appointment.id, // The Appointment ID
        medications, // List of medications passed from the request body
        note, // Optional note passed from the request body
      });
      await prescription.save();

      // Return success response
      res.status(201).json({
        message: "Prescription created successfully",
        prescription,
      });
    } else {
      res.json("Appointment not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//get Prescription
const getPrescription = async (req, res) => {
  try {
    let { id } = req.params;
    let data = await prescriptionModel.find({
      AppointmentID: id,
      DoctorID: req.body.DoctorID,
    });
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Get Today's Prescriptions (ignoring time)
const getTodaysPrescriptions = async (req, res) => {
  try {
    // Get today's date in a date-only format (ignore time)
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to 00:00:00

    // Fetch prescriptions where the date matches today (ignoring time)
    const prescriptions = await prescriptionModel
      .find({
        date: today,
      })
      .populate("PatientID DoctorID AppointmentID"); // You can populate the relevant fields if needed

    if (prescriptions.length === 0) {
      return res
        .status(404)
        .json({ message: "No prescriptions found for today" });
    }

    res.status(200).json({ prescriptions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get Old Prescriptions (before today, ignoring time)
const getOldPrescriptions = async (req, res) => {
  try {
    // Get today's date in a date-only format (ignore time)
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to 00:00:00

    // Fetch prescriptions where the date is before today (ignoring time)
    const prescriptions = await prescriptionModel
      .find({
        date: { $lt: today },
      })
      .populate({
        path: "PatientID",
        select: "firstname lastname phonenumber age gender",
      })
      .populate({ path: "DoctorID", select: "DoctorName" }) // You can populate the relevant fields if needed
      .populate({
        path: "AppointmentID",
        select: "appointmentdate appointmentTime",
      }); // You can populate the relevant fields if needed

    if (prescriptions.length === 0) {
      return res.status(404).json({ message: "No old prescriptions found" });
    }

    res.status(200).json({ prescriptions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


// Get Prescriptions for a Specific Date
const getPrescriptionsByDate = async (req, res) => {
  try {
    const { date } = req.query; // Get the date from query parameters

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    // Parse the date and set the range from start to end of the day
    const startOfDay = new Date(new Date(date).setHours(0, 0, 0, 0));
    const endOfDay = new Date(new Date(date).setHours(23, 59, 59, 999));

    // Fetch prescriptions for the specified date
    const prescriptions = await prescriptionModel
      .find({
        date: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      })
      .populate({
        path: "PatientID",
        select: "firstname lastname phonenumber age gender",
      })
      .populate({ path: "DoctorID", select: "DoctorName" })
      .populate({
        path: "AppointmentID",
        select: "appointmentdate appointmentTime",
      });

    if (prescriptions.length === 0) {
      return res
        .status(404)
        .json({ message: "No prescriptions found for the given date" });
    }

    res.status(200).json({ prescriptions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

//single Prescription
const SinglePrescription = async (req, res) => {
  try {
    let { id } = req.params;
    const SinglePrescription = await prescriptionModel
      .findById(id)
      .populate({
        path: "PatientID",
        select: "firstname lastname gender age address",
      })
      .populate({ path: "DoctorID", select: "DoctorName HospitalName" });
    res.json(SinglePrescription);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  allAppointment,
  PatientDetails,
  AddPriscription,
  getPrescription,
  getTodaysPrescriptions,
  getOldPrescriptions,
  getPrescriptionsByDate,
  getPrescriptionsByDate,
  SinglePrescription,
};
