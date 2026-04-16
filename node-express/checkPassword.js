const readline = require("node:readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const complexityRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;

rl.question("Syötä salasana: ", (password) => {
  const isComplex = complexityRegex.test(password);
  const isLongEnough = password.length >= 10;

  if (isLongEnough && isComplex) {
    console.log("Kaikki on hyvin!");
  } else if (!isLongEnough && isComplex) {
    console.log("Virhe: Salasanan on oltava vähintään 10 merkkiä pitkä.");
  } else if (isLongEnough && !isComplex) {
    console.log(
      "Virhe: Salasanassa on oltava isoja/pieniä kirjaimia, numeroita ja erikoismerkkejä.",
    );
  } else {
    console.log("Virhe: Salasana on liian lyhyt ja liian yksinkertainen.");
  }

  rl.close();
});
