require("dotenv").config()

const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');


const userRouter = require("./router/userProfileRouter")
const textRout = require("./router/testRoutes")
const replyingRout = require("./router/replyingCommentsRoute");
const path = require('path');
// const fs = require('fs');
// const bodyParser = require("body-parser"); 

const app = express()
// fs.readFileSync(`${__dirname}\\file`);
app.use(express.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
  });
   
// app.use(express.urlencoded({ extended: true }));
app.use(express.static('images'));


app.use((req, res, next) => {
    console.log(req.path , req.method)
    next()
})
// app.use(upload.array());
// router.use(bodyParser.json());
// app.use("/",express.static("../frontend/src/images"))
app.use("/clone/",userRouter)
app.use("/clone/texts/",textRout)
app.use("/clone/replying",replyingRout)
// app.use("/uploads", express.static("uploads"))
mongoose.connect(process.env.MONGOURI).then(() => {
    app.listen(process.env.PORT||4000, () => {
        console.log('listening on '+process.env.PORT||4000)
    })
}).catch((err) => console.error(err))