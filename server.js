require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { connection } = require("./config/dbconfig");

const spaceRoutes = require("./routes/spaceRoutes");
const taskRoutes = require("./routes/taskRoutes");

// express app
const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/spaces", spaceRoutes);
app.use("/api/tasks", taskRoutes);

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  app.listen(process.env.PORT, () =>
    console.log(`listening on ${process.env.PORT}!`)
  );
});
