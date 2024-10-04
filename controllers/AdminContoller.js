const path = require("path");
const Admin = require("../models/AdminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Hospital = require("../models/HospitalModel");
const Doctor = require("../models/DcoterSchema");

const signup = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      phonenumber,
      country,
      state,
      city,
      password,
      confirmpassword,
    } = req.body;
    const user = await Admin.findOne({ email: email });

    if (password === confirmpassword) {
      if (!user) {
        bcrypt.hash(password, 5, async (err, hash) => {
          let obj = {
            firstname,
            lastname,
            email,
            phonenumber,
            country,
            state,
            city,
            password: hash,
            confirmpassword: hash,
          };

          let user = await Admin.create(obj);
          res.status(200).json(user);
        });
      } else {
        res.status(400).json({ msg: "This email is already exists" });
      }
    } else {
      res.json({ msg: "Do not match password" });
    }
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let data = await Admin.findOne({ email: email });

    if (data) {
      const isMatch = await bcrypt.compare(password, data.password);
      if (isMatch) {
        let Admintoken = jwt.sign({ id: data._id }, process.env.AdminSecrate, {
          expiresIn: "1h",
        });
        res.cookie("Admintoken", Admintoken).cookie("id", data._id);
        res
          .status(200)
          .json({ message: "Successfully Login", data, Admintoken });
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

const resetpassword = async (req, res) => {
  try {
    const { oldpassword, newpassword, confirmpassword } = req.body;
    const user = await Admin.findOne({ _id: req.body.AdminID });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    } else {
      // Compare oldpassword with the stored hashed password
      const isMatch = await bcrypt.compare(oldpassword, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Old password is incorrect" });
      } else {
        // Check if newpassword matches confirmpassword
        if (newpassword !== confirmpassword) {
          return res
            .status(400)
            .json({ msg: "New password and confirm password do not match" });
        } else {
          // Hash the new password before saving it
          const hashedNewPassword = await bcrypt.hash(newpassword, 10);

          // Update the password in the database
          await Admin.findByIdAndUpdate(user._id, {
            password: hashedNewPassword,
          });

          res.status(200).json({ msg: "Password reset successfully" });
        }
      }
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// create hospital

const createHospital = async (req, res) => {
  try {
    let admin = await Admin.findById({ _id: req.body.AdminID });

    const createHospital = await Hospital.create(req.body);
    admin.hospital.push(createHospital._id);
    admin.save();
    res
      .status(200)
      .json({ msg: "Hospital created successfully", createHospital });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Admin Add doctor 

const AddDoctor = async (req, res) => {
  try {
    let doctorImage = req.files["DoctorImage"]
      ? req.files["DoctorImage"][0]
      : null;
    let doctorSignature = req.files["DoctorSignature"]
      ? req.files["DoctorSignature"][0]
      : null;

    let doctor = new Doctor(req.body);

    if (doctorImage) {
      doctor.DoctorImage = {
        url: doctorImage.path,
        filename: doctorImage.filename,
      };
    }

    if (doctorSignature) {
      doctor.DoctorSignature = {
        url: doctorSignature.path,
        filename: doctorSignature.filename,
      };
    }

    await doctor.save();
    res.status(200).json({ msg: "Doctor created successfully", doctor });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// admin profile
const AdminProfile=async(req,res)=>{
  try {
      let admindata=await Admin.findById({_id:req.body.AdminID})
      res.json(admindata)
  } catch (error) {
      res.state(500).json({msg:error.message})
  }
}

// upadte profile data

const AdminUpdate = async (req, res) => {
  try {
    let { id } = req.params
    let data = await Admin.findByIdAndUpdate(id, req.body,{new:true})
    res.json({ message: "update succesfully", data })

} catch (error) {
    res.status(500).json({ msg: error.message })
}

};

module.exports = { signup, login, resetpassword, createHospital, AddDoctor  , AdminUpdate , AdminProfile};
