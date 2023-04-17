const fs = require("fs");

function getUsers() {
  const usersStr = fs.readFileSync("./users.json", "utf-8");

  const users = JSON.parse(usersStr);

  return users;
}

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
