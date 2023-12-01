const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const liveReload = require("livereload");
const connectLiveReload = require("connect-livereload");

const liveReloadServer = liveReload.createServer();
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
})

const app = express();
app.use(connectLiveReload());

app.set("views", path.join(__dirname, "frontend/views"));
app.set("view engine", "ejs");


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/static", express.static(path.join(__dirname, "frontend/static")));


const adminRoute = require("./backend/routes/admin");
const livereload = require("connect-livereload");

app.use("/", adminRoute);

const PORT = process.env.port || 3001;
 
app.listen(PORT, () => {
    console.log(`Listening to port: `, PORT);
})