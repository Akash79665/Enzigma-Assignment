const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");



const tasksRoutes=require("./tasks");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());


app.use("/api",tasksRoutes);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});