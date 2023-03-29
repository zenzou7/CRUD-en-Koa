const Router = require("koa-router");
const router = new Router({ prefix: "/productos" });
const daoProductos = require("./src/DAO/daoMongoProductos.js");
const classProductos = new daoProductos();
//books.js
/* API REST Get All */
router.get("/", async (ctx) => {
  ctx.body = {
    status: "success",
    message: await classProductos.getAll(),
  };
});

/* API REST Get x ID */
router.get("/:id", async (ctx) => {
  const getProducto = await classProductos.getById(ctx.params.id);

  if (getProducto) {
    ctx.body = getProducto;
  } else {
    ctx.response.status = 404;
    ctx.body = {
      status: "error!",
      message: "Producto Not Found with that id!",
    };
  }
});

/* API REST Post */
router.post("/", async (ctx) => {
  // Check if any of the data field not empty
  if (
    ctx.request.body.id &&
    ctx.request.body.name &&
    ctx.request.body.price &&
    ctx.request.body.thumbnail
  ) {
    await classProductos.save({
      id: ctx.request.body.id,
      name: ctx.request.body.name,
      price: ctx.request.body.price,
      thumbnail: ctx.request.body.thumbnail,
    });
    ctx.response.status = 201;
    ctx.body = {
      status: "success",
      message: `New producto added with id:  ${ctx.request.body.id} & name: ${ctx.request.body.name}`,
    };
  } else {
    ctx.response.status = 400;
    ctx.body = {
      status: "error",
      message: "Please enter the data",
    };
  }
});

/* API REST Put */
router.put("/:id", async (ctx) => {
  // Check if any of the data field not empty
  if (
    ctx.request.body.id &&
    ctx.request.body.name &&
    ctx.request.body.price &&
    ctx.request.body.thumbnail
  ) {
    const id = ctx.params.id;
    const productFind = await classProductos.getById(id);

    if (productFind) {
      ctx.response.status = 201;
      await classProductos.update(id, ctx.request.body);

      return (ctx.body = {
        status: "success",
        message: `Producto updated with id: ${ctx.request.body.id} & name: ${ctx.request.body.name}`,
      });
    } else {
      ctx.response.status = 400;
      return (ctx.body = {
        status: "error",
        message: "Please enter the valid producto id",
      });
    }
  } else {
    ctx.response.status = 400;
    ctx.body = {
      status: "error",
      message: "Please enter the data",
    };
  }
});

/* API REST Delete */
router.delete("/:id", async (ctx) => {
  const id = ctx.params.id;
  const prod = classProductos.getById(id);
  if (prod) {
    await classProductos.delete(id);
    ctx.response.status = 200;
    ctx.body = {
      status: "success",
      message: `Producto deleted with id: ${id}`,
    };
  }
});

module.exports = { productos: router };
