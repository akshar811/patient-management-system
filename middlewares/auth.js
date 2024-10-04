const jwt = require("jsonwebtoken");

const Auth = (req, res, next) => {
  let { token } = req.cookies;

  if (token) {
    let decode = jwt.verify(token, process.env.jwtSecrate);
    req.body.PatientID = decode.id;
    next();
  } else {
    res.redirect("/Patient/login");
  }
};

const AdminAuth = (req, res, next) => {
  let { Admintoken } = req.cookies;

  if (Admintoken) {
    let decode = jwt.verify(Admintoken, process.env.AdminSecrate);
    req.body.AdminID = decode.id;
    next();
  } else {
    res.status(403).json("You are not authorized");
  }
};

const DoctorAuth = (req, res, next) => {
  let { Doctortoken } = req.cookies;

  if (Doctortoken) {
    let decode = jwt.verify(Doctortoken, process.env.DoctorSecrate);
    req.body.DoctorID = decode.id;
    next();
  } else {
    res.status(403).json("You are not authorized");
  }
};


const AuthDoctorOrAdmin = (req, res, next) => {
  let { Doctortoken, Admintoken } = req.cookies;

  if (Doctortoken) {
      try {
          let decode = jwt.verify(Doctortoken, process.env.DoctorSecrate);
          req.body.DoctorID = decode.id;  
          next();  
      } catch (err) {
          return res.status(403).json("Invalid doctor token");
      }
  } else if (Admintoken) {
      try {
          let decode = jwt.verify(Admintoken, process.env.AdminSecrate);
          req.body.AdminID = decode.id;  
          next(); 
      } catch (err) {
          return res.status(403).json("Invalid admin token");
      }
  } else {
      return res.status(403).json("You are not authorized");
  }
};


module.exports = { Auth, AdminAuth , DoctorAuth , AuthDoctorOrAdmin};
