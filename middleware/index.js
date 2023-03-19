// import expressJwt from "express-jwt";
import express from "express"
export const userExist = (req, res) => { console.log(req.cookies) }
// var expressJwt = require('express-jwt');
// export const userExist = expressJwt({

//     getToken: (req, res) => console.log(req.cookies),
//     secret: process.env.JWT_SECRET,
//     algorithms: ["HS256"],
// });

//if valid user_id will be output