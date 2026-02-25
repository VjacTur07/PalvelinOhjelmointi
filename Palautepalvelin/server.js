const express = require("express");
const app = express();
const port = 3000;

let data = require("./feedback_mock.json");

app.use(express.json());

app.get("/palaute", (req, res) => {
  res.json(data);
});
app.get("/palaute/:id", (req, res) => {
  const searchId = parseInt(req.params.id);
  console.log("Haetaan ID:tä", searchId);
  const palaute = data.find((p) => p.id === searchId);

  if (palaute) {
    res.json(palaute);
  } else {
    res.status(404).send("Palaute ei löytynyt");
  }
});

app.post("/palaute/uusi", (req, res) => {
  try {
    const uusiPalaute = {
      id: data.length > 0 ? Math.max(...data.map((p) => p.id)) + 1 : 1,
      name: req.body.name,
      email: req.body.email,
      feedback: req.body.feedback,
    };
    if (!uusiPalaute.name || !uusiPalaute.feedback) {
      throw new Error("Nimi ja palaute ovat pakollisia");
    }

    data.push(uusiPalaute);
    res.status(200).json(uusiPalaute);
  } catch (error) {
    res.status(400).json({ status: "ERROR", message: error.message });
  }
});

app.put("/palaute/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = data.findIndex((p) => p.id === id);

  if (index !== -1) {
    data[index] = { ...data[index], ...req.body, id: id };
    res.status(200).json(data[index]);
  } else {
    res.status(400).json({ status: "ERROR", message: "id ei löydy" });
  }
});

app.delete("/palaute/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = data.findIndex((p) => p.id === id);

  if (index !== -1) {
    const poistettu = data.splice(index, 1);
    res.status(200).json(poistettu[0]);
  } else {
    res.status(400).json({ status: "ERROR", message: "Id ei löydy" });
  }
});

app.listen(port, () => {
  console.log(`Palvelin pyörii osoitteessa http://localhost:${port}`);
});
