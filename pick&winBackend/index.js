const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;
const route = require("./Routes/route");
var cors = require('cors')
 
app.use(cors())


app.use(bodyParser.urlencoded({ extended: false}));

app.use(bodyParser.json());

app.use("/",route);

app.listen(port,()=>{
    console.log("Server is running on port :"+ port);
}) 

