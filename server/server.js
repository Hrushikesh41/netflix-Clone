const express = require('express');
const env = require('dotenv');
require("./db/conn");
require("./models/user.model")

const app = express();
app.use(express.json());

env.config({path : 'config.env'});

const port = process.env.PORT || 3000;

app.use(require("./routes/register"));
app.use(require("./routes/getUsers"));
app.use(require("./routes/updatePassword"));
app.use(require("./routes/login"))

app.get("/", (req, res) => {
    res.send("Hello Streamers")
});

app.listen(port, () => {
    console.log("APP LISTENING AT PORT : " + port);
});