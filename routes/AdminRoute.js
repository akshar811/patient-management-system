const { Router } = require("express");
const { signup, login, resetpassword, createHospital, AddDoctor, AdminUpdate, AdminProfile } = require("../controllers/AdminContoller");
const { AdminAuth, AuthDoctorOrAdmin } = require("../middlewares/auth");

const AdminRoute = Router();


const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

// admin log in, registre and resetpassword 
AdminRoute.post("/signup", signup );
AdminRoute.post("/login", login );

// change password
AdminRoute.patch("/ResetPassword",AdminAuth,resetpassword);

// create hospital
AdminRoute.post("/Hospital-create",AdminAuth,createHospital);

// add doctor 
AdminRoute.post("/doctor-add",AuthDoctorOrAdmin, upload.fields([
    { name: "DoctorImage", maxCount: 1 },
    { name: "DoctorSignature", maxCount: 1 },
  ]),AddDoctor);


// admin profile
AdminRoute.get("/admin-profile",AdminAuth,AdminProfile);

  // admin update profile data

  AdminRoute.patch("/Admin-update-profile/:id",AdminAuth,AdminUpdate);

module.exports = AdminRoute;


