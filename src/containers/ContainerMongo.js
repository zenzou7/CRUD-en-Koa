const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Leo:62742@coder-backend.3x5udc7.mongodb.net/?retryWrites=true&w=majority",
      { useNewUrlParser: true }
    );
  } catch (e) {
    console.log(e);
    throw "can not connect to the db";
  }
};

connection();

class ContenedorMongo {
  constructor(ruta) {
    this.ruta = ruta;
  }

  async getAll() {
    const prods = await this.ruta.find();

    return prods;
  }
  async getById(prodId) {
    try {
      const prod = await this.ruta.findById(prodId);
      return prod;
    } catch (err) {
      console.log(err);
    }
  }
  async save(obj) {
    const newProd = new this.ruta(obj);
    try {
      newProd.save();
      return console.log("Guardado con exito");
    } catch (err) {
      return console.log(err);
    }
  }
  async update(id, obj) {
    const objId = { _id: id };
    const update = {
      $set: obj,
    };
    const options = { upsert: false };

    await this.ruta
      .updateOne(objId, update, options)
      .then((result) => {
        const { matchedCount, modifiedCount } = result;
        if (matchedCount && modifiedCount) {
          console.log(`Se actualizó correctamente.`);
        }
      })
      .catch((err) => console.error(`No se pudo actualizar: ${err}`));
  }
  async delete(id) {
    if (id) {
      await this.ruta.deleteOne({ _id: id });
      return console.log(`Producto ${id} borrado`);
    } else {
      await this.ruta.deleteMany({});
      return console.log("Todos los productos borrados");
    }
  }
}

module.exports = ContenedorMongo;
