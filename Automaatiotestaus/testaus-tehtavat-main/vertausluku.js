/**
 * Laskee D'Hondtin vertausluvut yhdelle listalle
 * @param {Object[]} ehdokkaat - Taulukko ehdokasobjekteja, joissa numero, nimi ja äänimäärä
 * @returns {Object[]} - Sama taulukko, mutta lisättynä vertausluvuilla
 */
function laskeVertausluvut(ehdokkaat) {
  // Järjestetään ehdokkaat äänimäärän mukaan laskevasti
  const jarjestetyt = [...ehdokkaat].sort((a, b) => {
    if (b.aanet !== a.aanet) {
      return b.aanet - a.aanet;
    }
    return Math.random() - 0.5;
  });

  // Laske äänien summa
  const aanetYhteensa = jarjestetyt.reduce(
    (summa, ehdokas) => summa + ehdokas.aanet,
    0,
  );

  // Lasketaan vertausluvut: äänet / sija listassa
  return jarjestetyt.map((ehdokas, index) => {
    const onSamaAanimara =
      ehdokkaat.filter((e) => e.aanet === ehdokas.aanet).length > 1;
    return {
      ...ehdokas,
      vertausluku: aanetYhteensa / (index + 1),
      ...(onSamaAanimara && { arvottu: true }),
    };
  });
}

export default laskeVertausluvut;
export { laskeVertausluvut };
