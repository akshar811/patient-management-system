const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Doctor = require("../models/DcoterSchema");
const appointmentModel = require("../models/AppointmentModel");


// doctor log in
const doctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    let data = await Doctor.findOne({ email: email });

    if (data) {
      if (password === data.password) {
        let Doctortoken = jwt.sign(
          { id: data._id },
          process.env.doctorSecrate,
          { expiresIn: "1h" }
        );
        res.cookie("Doctortoken", Doctortoken).cookie("id", data._id);
        res
          .status(200)
          .json({ message: "Successfully Login", data, Doctortoken });
      } else {
        res.status(400).json({ message: "Password incorrect" });
      }
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// change password / reset password

const resetpassword = async (req, res) => {
  try {
    const { oldpassword, newpassword, confirmpassword } = req.body;
    const user = await Doctor.findOne({ _id: req.body.DoctorID });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    } else {
      // Directly compare oldpassword with stored password (no bcrypt)
      if (oldpassword !== user.password) {
        return res.status(400).json({ msg: "Old password is incorrect" });
      } else {
        // Check if newpassword matches confirmpassword
        if (newpassword !== confirmpassword) {
          return res
            .status(400)
            .json({ msg: "New password and confirm password do not match" });
        } else {
          // Update the password in the database without hashing
          await Doctor.findByIdAndUpdate(user._id, {
            password: newpassword,
          });

          res.status(200).json({ msg: "Password reset successfully" });
        }
      }
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


// doctor profile
const DoctorProfile = async (req, res) => {
  try {
      let doctordata = await Doctor.findById({ _id: req.body.DoctorID})
      res.json(doctordata)
  } catch (error) {
      res.state(500).json({ msg: error.message })
  }
}

// edit profile

const EditProfile = async (req, res) => {
  try {
    let { id } = req.params	
    let data = await Doctor.findByIdAndUpdate(id, req.body,{new:true})
    res.json({ message: "update succesfully", data })

} catch (error) {
    res.status(500).json({ msg: error.message })
}
}

// patient record
const PatientRecord = async (req, res) => {
  try {

    const appointmentHistory = await appointmentModel.find({ DoctorID:req.body.DoctorID })
      .populate('PatientID', 'firstname lastname age gender') // Populates patient information
      
    res.status(200).json({ message: 'Doctor appointment history', data: appointmentHistory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


// single page patient details
const SinglePatient=async(req,res)=>{
  try {
      let{PatientID}=req.params
      const singlepatient=await appointmentModel.findOne({PatientID})
      .populate({ path: "PatientID" }) 
      .populate({ path: "DoctorID", select: "DoctorName" });
      res.json(singlepatient)
  } catch (error) {
      console.log(error);
      
      res.status(500).json({ message: error.message });
  }
}

module.exports = { doctorLogin , resetpassword , DoctorProfile , EditProfile , PatientRecord , SinglePatient};
