const fs = require("fs");

const getUsers = () => {
  const usersStr = fs.readFileSync("./users.json");

  const users = JSON.parse(usersStr);

  return users;
};

const savedUsers = (users) => {
  fs.writeFileSync("./users.json", JSON.stringify(users));
};

const addUsers = (users) => {
  const user = getUsers();
  user.push(users);
  savedUsers(users);
};
module.exports = {
  getUsers,
  savedUsers,
  addUsers,
};
