require("dotenv").config()

const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');

;
const userRouter = require("./router/userProfileRouter")
const textRout = require("./router/testRoutes")
const replyingRout = require("./router/replyingCommentsRoute")
// const fs = require('fs');
// const bodyParser = require("body-parser"); 

const app = express()
// fs.readFileSync(`${__dirname}\\file`);
app.use(express.json())
app.use(cors({origin: 'http://localhost:3000'}))

app.use((req, res, next) => {
    console.log(req.path , req.method)
    next()
})
// app.use(upload.array());
// router.use(bodyParser.json());
app.use("/",express.static("../frontend/src/images"))
app.use("/clone/",userRouter)
app.use("/clone/texts/",textRout)
app.use("/clone/replying",replyingRout)
// app.use("/uploads", express.static("uploads"))
mongoose.connect(process.env.MONGOURI).then(() => {
    app.listen(process.env.PORT, () => {
        console.log('listening on '+process.env.PORT)
    })
}).catch((err) => console.error(err))