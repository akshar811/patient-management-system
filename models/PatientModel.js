const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    phonenumber: { type: String, required: true },
    age: { type: Number, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    BloodGroup: { type: String, required: true },
    DateOfBirth : { type: Date, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
   
    address: { type: String, required: true },
    password: { type: String, require: true },
    confirmpassword: { type: String, require: true },
  },
  { timestamps: true }
);

let Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
