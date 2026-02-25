const express = require("express");
const app = express();
const port = 3000;

let isMachineOn = false;

function makeCoffee(isMachineOn) {
  return new Promise((resolve, reject) => {
    console.log("Starting the coffee machine...");

    setTimeout(() => {
      if (isMachineOn) {
        resolve("☕ Coffee is ready!");
      } else {
        reject("🚫 Coffee machine is off. Please turn it on.");
      }
    }, 2000); // Simulate 2 seconds to make coffee
  });
}
app.get("/set/on", (req, res) => {
  isMachineOn = true;
  res.send("Coffee machine is on. :)");
});
app.get("/set/off", (req, res) => {
  isMachineOn = false;
  res.send("Coffee machine is off. :(");
});
app.get("/coffee", (req, res) => {
  makeCoffee(isMachineOn)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});
app.get("/switch", (req, res) => {
  isMachineOn = !isMachineOn;
  res.send(`Coffee machine is now ${isMachineOn ? "ON" : "OFF"}`);
});

app.listen(port, () => {
  console.log(`Coffee server adress is http://localhost:${port}`);
});
