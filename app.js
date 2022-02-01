const connectDB = require("./db/database");
const express = require ("express");
const eventRoutes = require ("./apis/products/routes")
const app = express();
app.use(express.json());
app.use("/event",eventRoutes);







connectDB();
app.listen(8000 , () => {console.log("this app is running on port 8000 ")});