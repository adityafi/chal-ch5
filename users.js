const usersRouter = require("express").Router();
const { getUsers, addUsers } = require("./users");

usersRouter.get("/", (require, response) => {
  response.render("index");
});

usersRouter.get("/game", (require, response) => {
  response.render("game");
});

usersRouter.get("/api/v1/users", (require, response) => {
  const data = getUsers();
  const users = data.map((uses) => {
    return {
      nama: user.nama,
      umur: user.umur,
    };
  });

  response.json(users);
});

usersRouter.post("/api/v1/users", (require, response) => {
  addUsers(require.body);
});

module.exports = userRouter;
