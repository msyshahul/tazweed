const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const sellerRoutes = require("./routes/Sellers");
const buyerRoutes = require("./routes/Buyers");
const scheduleRoutes = require("./routes/Schedules");
const appointmentRoutes = require("./routes/Appointments");
mongoose.set("useCreateIndex", true);
const app = express();
app.use(cors());
app.use(bodyParser.json());

const MongoDBUrl = "mongodb://localhost/tazweed";

mongoose
  .connect(MongoDBUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

app.use("/api/sellers", sellerRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/buyers", buyerRoutes);
app.use("/api/appointments", appointmentRoutes);

app.listen(3001, () => {
  console.log(`Server running on port ${3001}`);
});
