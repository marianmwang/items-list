const itemsRouter = require("express").Router();
const Item = require("../models/Item.js");

itemsRouter.get("/", (request, response) => {
  Item.find({}).then((items) => {
    response.json(items);
  });
});

itemsRouter.get("/:id", (request, response, next) => {
  Item.findById(request.params.id)
    .then((item) => {
      if (item) {
        response.json(item);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

itemsRouter.post("/", (request, response, next) => {
  const body = request.body;

  const item = new Item({
    name: body.name,
    quantity: body.quantity,
    deleted: false,
  });

  item
    .save()
    .then((savedItem) => {
      response.json(savedItem);
    })
    .catch((error) => next(error));
});

itemsRouter.delete("/:id", (request, response, next) => {
  Item.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

itemsRouter.put("/:id", (request, response, next) => {
  const body = request.body;

  const item = {
    name: body.name,
    quantity: body.quantity,
    deleted: !body.deleted,
  };

  Item.findByIdAndUpdate(request.params.id, item, { new: true })
    .then((updatedItem) => {
      response.json(updatedItem);
    })
    .catch((error) => next(error));
});

module.exports = itemsRouter;
