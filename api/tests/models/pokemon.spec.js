const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Pokemon.create({ name: 'Pikachu' });
      });
    });

    describe("Stats", () => {
      it("Arroja un error si vida no es numero", (done) => {
        Pokemon.create({ name: "Pikachu", hp: "asd" })
          .then(() => done(new Error("Hp no es un numero")))
          .catch(() => done());
      });
  });

  it("Arroja un error si attack no es numero", (done) => {
    Pokemon.create({ name: "Pikachu", attack: "asd" })
      .then(() => done(new Error("attack no es un numero")))
      .catch(() => done());
  });

  it("Arroja un error si defensa no es numero", (done) => {
    Pokemon.create({ name: "Pikachu", defense: "asd" })
      .then(() => done(new Error("Defensa no es un numero")))
      .catch(() => done());
  });

  it("Arroja un error si velocidad no es numero", (done) => {
    Pokemon.create({ name: "Pikachu", speed: "asd" })
      .then(() => done(new Error("speed no es un numero")))
      .catch(() => done());
  });

  it("Arroja un error si altura no es numero", (done) => {
    Pokemon.create({ name: "Pikachu", height: "asd" })
      .then(() => done(new Error("altura no es un numero")))
      .catch(() => done());
  });
  it("Arroja un error si peso no es numero", (done) => {
    Pokemon.create({ name: "Pikachu", weight: "asd" })
      .then(() => done(new Error("peso no es un numero")))
      .catch(() => done());
  });
})
})
