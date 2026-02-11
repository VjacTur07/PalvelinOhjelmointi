// Ensin importit
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

// Luodaan express-palvelin instanssi
const app = express();
app.use("/images", express.static(path.join(__dirname, "images")));

// Määritellään vakiot
const port = 3001;
const host = "localhost";

// Määritellään polut
app.get("/", (req, res) => {
  // res.send(`<h1>Hello World!</h1>`);
  res.sendFile(path.join(__dirname, "templates/index.html"));
});

// Käynnistetään palvelin kuuntelemaan vakioiden mukaista osoitetta
app.listen(port, host, () => console.log(`${host}:${port} kuuntelee...`));
