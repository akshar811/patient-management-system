const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  PatientID: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  DoctorID: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  HospitalID : {type : mongoose.Schema.Types.ObjectId, ref:'Hospital'} ,
  speciality:{type:String,required:true},
  city : {type : String, required : true},
  state : {type : String, required : true},
  country : {type : String, required : true},
  appointmentdate: { type: Date, required: true },
  appointmentTime : {type : String , required : true},
  status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' },
  type: { type: String, enum: ['online', 'teleconsultation'], required: true },
  patientIssue: {type : String , required : true},
  diease: String,

}, { timestamps: true });

const appointmentModel = mongoose.model('Appointment', appointmentSchema);

module.exports = appointmentModel;
