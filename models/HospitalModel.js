const mongoose = require("mongoose");

const Hospitalmodel = new mongoose.Schema(
  {
   HospitalName : { type: String , required: true },
   HospitalAddress : { type: String , required: true},
   country: { type: String, required: true },
   state: { type: String, required: true },
   city: { type: String, required: true },
   ZipCode: { type: Number, required: true },
  },
  { timestamps: true }
);

let Hospital = mongoose.model("Hospital", Hospitalmodel);

module.exports = Hospital;
