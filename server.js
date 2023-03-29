const Koa = require("koa");
const { koaBody } = require("koa-body");

const app = new Koa();

app.use(koaBody());

let { productos } = require("./productosRouter.js");
app.use(productos.routes());

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor Koa escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log("Error en Servidor Koa:", error));
