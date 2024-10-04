const appointmentModel = require("../models/AppointmentModel");

const createAppointment = async (req, res) => {
  try {
    const { PatientID, DoctorID, appointmentdate, appointmentTime } = req.body;

    // Check if the doctor is available at the requested time
    const conflictingAppointment = await appointmentModel.findOne({
      DoctorID,
      appointmentdate,
      appointmentTime,
      status: { $ne: "cancelled" }, // Don't count cancelled appointments
    });

    if (conflictingAppointment) {
      return res
        .status(400)
        .json({ message: "Doctor is not available at this time" });
    }

    // If available, create a new appointment
    const newAppointment = new appointmentModel(req.body);
    await newAppointment.save();

    res
      .status(201)
      .json({
        message: "Appointment booked successfully",
        data: newAppointment,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// AllAppointment
const AllAppointment = async (req, res) => {
  try {
    let data = await appointmentModel.find({
      PatientID: req.body.PatientID,
    }).populate("PatientID DoctorID HospitalID");
    res.json(data);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//   UpdateAppointment
const UpdateAppointment = async (req, res) => {
  try {
    let { id } = req.params;
    let data = await appointmentModel.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ message: "update succesfully", data });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//   DeleteAppointment
const DeleteAppointment = async (req, res) => {
  try {
    let { id } = req.params;
    let data = await appointmentModel.findByIdAndDelete(id);
    res.json({ message: "Delete succesfully", data });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};



// Fetch appointment history for a patient
const getPatientAppointmentHistory = async (req, res) => {
    try {
        const { PatientID } = req.params;

        const appointmentHistory = await appointmentModel.find({ PatientID })
            .populate('DoctorID', 'DoctorName specialtiyType') // Populates doctor information
            .sort({ appointmentdate: -1 }); // Sort by date (most recent first)

        res.status(200).json({ message: 'Patient appointment history', data: appointmentHistory });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Fetch appointment history for a doctor
const getDoctorAppointmentHistory = async (req, res) => {
    try {
      const { DoctorID } = req.params;
  
      const appointmentHistory = await appointmentModel.find({ DoctorID })
        .populate('PatientID', 'firstname lastname') // Populates patient information
        .sort({ appointmentdate: -1 });
        console.log(appointmentHistory);
        
      res.status(200).json({ message: 'Doctor appointment history', data: appointmentHistory });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  // Cancel an appointment
  const cancelAppointment = async (req, res) => {
    try {
      const { id } = req.params;
  
      const appointment = await appointmentModel.findById(id);
  
      if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }
  
      appointment.status = 'cancelled';
      await appointment.save();
  
      res.status(200).json({ message: 'Appointment cancelled successfully', data: appointment });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


    // Fetch all upcoming appointments for a doctor
const getDoctorUpcomingAppointments = async (req, res) => {
    try {
      const { DoctorID } = req.params;
  
      const upcomingAppointments = await appointmentModel.find({
        DoctorID,
        appointmentdate: { $gte: new Date() }, // Find appointments from today onwards
        status: 'scheduled'
      }).populate('PatientID','firstname lastname ');
  
      res.status(200).json({ message: 'Upcoming appointments', data: upcomingAppointments });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

module.exports = {
  createAppointment,
  AllAppointment,
  UpdateAppointment,
  DeleteAppointment,
  getPatientAppointmentHistory,
  getDoctorAppointmentHistory,
  cancelAppointment,
  getDoctorUpcomingAppointments
};
