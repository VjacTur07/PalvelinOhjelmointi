import laskeVertausluvut from "../vertausluku.js";
import ehdokasRekisteri from "../ehdokasRekisteri.js";

import { afterEach, beforeEach, describe, it, mock } from "node:test";
import assert from "node:assert/strict";

describe("laskeVertausluvut", () => {
  beforeEach(() => {
    const lista = [
      { numero: 101, nimi: "Maija Meikäläinen", aanet: 1 },
      { numero: 102, nimi: "Kalle Korhonen", aanet: 4 },
      { numero: 103, nimi: "Sari Virtanen", aanet: 2 },
      { numero: 104, nimi: "Jukka Jokinen", aanet: 5 },
    ];

    mock.method(ehdokasRekisteri, "haeLista", () => {
      return lista;
    });
  });
  afterEach(() => {
    mock.reset();
  });

  it("listan eniten ääniä saaneen ehdokkaan vertausluku on listan äänten summa", () => {
    const tulos = laskeVertausluvut(ehdokasRekisteri.haeLista(1));
    assert.equal(tulos[0].vertausluku, 12);
  });
  it("listan toiseksi eniten ääniä saaneen ehdokkaan vertausluku on puolet listan äänien summasta", () => {
    const tulos = laskeVertausluvut(ehdokasRekisteri.haeLista(1));
    assert.equal(tulos[1].vertausluku, 6);
  });
  it("merkitsee ehdokkaat arvotuiksi, jos heillä on sama äänimäärä", () => {
    const testiLista = [
      { numero: 1, aaneet: 10 },
      { numero: 2, aaneet: 10 },
    ];
    const tulos = laskeVertausluvut(testiLista);

    assert.equal(tulos[0].arvottu, true);
    assert.equal(tulos[1].arvottu, true);
  });
  it("arpoo järjestyksen satunnaisesti, kun äänet ovat tasan", () => {
    const testiLista = [
      { numero: 1, aanet: 10 },
      { numero: 2, aanet: 10 },
    ];
    const tulokset = [];

    for (let i = 0; i < 20; i++) {
      tulokset.push(laskeVertausluvut(testiLista)[0].numero);
    }

    const uniikitEkat = new Set(tulokset);
    assert.ok(uniikitEkat.size > 1);
  });
});
