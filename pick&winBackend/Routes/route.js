const express = require('express');
const route = express.Router();
const {addproduct,getproduct,login,signup,deleteproduct,updateproduct,orderplace} = require("../Controllers/controller");
const verifyToken = require("../Config/jwt");


route.post("/addproduct",verifyToken,addproduct)
route.post("/getproduct",getproduct)
route.post("/login", login)
route.post("/signup", signup)
route.post("/updateproduct",verifyToken, updateproduct)
route.post("/deleteproduct",verifyToken, deleteproduct)
route.post("/updateproduct",verifyToken, updateproduct)
route.post("/orderplace", verifyToken, orderplace)

module.exports = route;
