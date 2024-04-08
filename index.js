const express = require("express");
const cors = require('cors')
const { cpuIntensiveTask } = require('./command'); // assumi

require("@opentelemetry/api");

const app = express();

app.use(cors());

app.all("/", (req, res) => {
   res.json({ method: req.method, message: "Hello OnXP", ...req.body });
});

app.get('/intensive', (req, res) => {
   // Call the CPU-intensive task function
   cpuIntensiveTask((result) => {
      console.log(result);
      res.json({ method: req.method, message: "Running intensive CPU Task. Please wait...", ...req.body });
   });
});

const port = process.env.APP_PORT || "3000";
app.listen(port, function() {
    console.log('server running on port ' + port + '.');
});