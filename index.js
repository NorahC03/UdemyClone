import Express from "express";
import cors from "cors";
const morgan = require('morgan');
require('dotenv').config();
import fs from "fs";
import mongoose from "mongoose";
const csrf = require("csurf");
var cookieParser = require('cookie-parser');


const csrfProtect = csrf({ cookie: true });


const { readdirSync } = fs;

//Express App
const app = Express();


//Middlewares functions for

app.use(cors());  //For different port selection frontend and backend
app.use(cors({ origin: "http://localhost:3000" }))
app.use(Express.json());   //Sending data as json to frontend
app.use(morgan("dev"));
//RoutesRequest
const autRoutes = require("./routes/auth");
app.use("/api", autRoutes);

//routes
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)))   //(/api) as prefix



app.use(cookieParser())

//csrf protection

app.use(csrfProtect)

// app.get("/api/csrf-token", (req, res) => {
//     res.json({ csrfToken: req.csrfToken() })
// })

app.get('/api/csrf-token', csrfProtect, function (req, res) {
    // pass the csrfToken to the view
    // res.render('send', { csrfToken: req.csrfToken() })
    res.json({ csrfToken: req.csrfToken() })
})
//DB
mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,
})
    .then(() => { console.log("DB CONNECTED") })
    .catch((err) => { console.log("DB not connected ", err) })
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => { console.log(`Server is running at${PORT}`) })