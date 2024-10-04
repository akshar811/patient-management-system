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

// pateitn details
const PatientDetails = async (req, res) => {
    try {
        let{id}=req.params
        const SingleAppoiment=await appointmentModel.findById(id)
        .populate({ path: "PatientID" , select: "firstname lastname phonenumber gender age address" }) 
        .populate({ path: "DoctorID", select: "DoctorName" });
        res.json(SingleAppoiment)
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: error.message });
    }
}

module.exports = { allAppointment , PatientDetails};
