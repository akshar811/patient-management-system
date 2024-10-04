const mongoose = require("mongoose");

const Doctormodel = new mongoose.Schema(
  {
    DoctorImage : {
        url : String,
        filename : String,
    },
    DoctorSignature : {
      url : String,
      filename : String,
    },
    DoctorName: { type: String, required: true },
    DoctorQualification: { type: String, required: true },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    specialtiyType: { type: String, required: true },
    WorkOn: { type: String, required: true },
    workingTime: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^([0-9]{1,2}):([0-9]{2})$/.test(v); // validate time format (HH:MM)
        },
        message: (props) => `${props.value} is not a valid time format`,
      },
    },

    CheckupTime: {
      type: String,
      required: true,
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^([0-9]{1,2}):([0-9]{2})$/.test(v); // validate time format (HH:MM)
        },
        message: (props) => `${props.value} is not a valid time format`,
      },
    },
    BreakTime: {
      type: String,
      required: true,
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^([0-9]{1,2}):([0-9]{2})$/.test(v); // validate time format (HH:MM)
        },
        message: (props) => `${props.value} is not a valid time format`,
      },
    },
    Experince: { type: String, required: true },
    phonenumber: { type: String, required: true },
    age: { type: Number, required: true },
    DoctorEmail: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    ZipCode: { type: Number, required: true },
    DoctorAdress: { type: String, required: true },
    Description: { type: String, required: true },
    OnlineConsulationRate: { type: Number, required: true },

    DoctorCurrentHospital: { type: String, required: true },
    HospitalName: { type: String, required: true },
    HospitalAdress: { type: String, required: true },
    HospitalWebsiteLink: { type: String, required: true },
    EmergencyContactNumber: { type: Number, required: true },
    password : { type: String, required: true},
    
    AdminID: {type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  },
  { timestamps: true }
);

let Doctor = mongoose.model("Doctor", Doctormodel);

module.exports = Doctor;
