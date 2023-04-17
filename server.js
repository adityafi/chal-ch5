// const http = require("http");
// const fs = require("fs");

// const indexHtml = fs.readFileSync("./public/index.html");
// const gameHtml = fs.readFileSync("./public/game.html");

// const server = http.createServer(function (request, response) {
//   if (request.url === "/") {
//     response.write(indexHtml);
//     response.end();
//   } else if (request.url === "/game") {
//     response.write(gameHtml);
//     response.end();
//   } else {
//     if (request.url.startsWith("/static")) {
//       try {
//         const file = fs.readFileSync(`./public${request.url}`);
//         response.write(file);
//       } catch (error) {}
//     }
//     response.end();
//   }
// });

const express = require("express");
const { getUsers } = require("./helper");

const server = express();

server.set("view engine", "ejs");
server.set("views", "public");

server.use(express.json());
server.use("/static", express.static("public/static"));

server.get("/", function (require, response) {
  // res.sendFile(`public/chapter3.html`, { root: __dirname });
  response.render(`index.ejs`, {
    headerText: "PLAY TRADITIONAL GAME",
    headerSubText: "Experience new traditional game play",
  });
});

server.get("/game", function (require, response) {
  response.sendFile(`public/game.html`, { root: __dirname });
});

server.get("/test", function (require, response) {
  const { name } = require.query;
  const users = getUsers();

  const result = users.map(function (user) {
    return {
      username: user.username,
    };
  });

  response.render("test.ejs", {
    name,
    lain: "non abstrak",
    users: result,
  });
  // res.sendFile(`public/test.html`, { root: __dirname });
  // res.send(`
  //     <html>
  //         <body>
  //             <h1>Hello, ${name}</h1>
  //         </body>
  //     </html>
  // `);
});

server.get("/api/v1/accounts", function (require, response) {
  const users = getUsers();

  const result = users.map(function (user) {
    return {
      username: user.username,
    };
  });

  response.json(result);
});

server.post("/api/v1/accounts/login", function (require, response) {
  const { username, password } = require.body;

  const users = getUsers();

  const found = users.find(function (user) {
    return user.username === username;
  });

  if (found) {
    const passwordMatch = found.password === password;

    if (!passwordMatch) {
      response.status(400);
      response.json({
        error: "password or user is wrong",
      });
    } else {
      response.json({
        id: found.id,
      });
    }
  } else {
    response.status(400);
    response.json({
      error: "password or user is wrong",
    });
  }
});

server.listen(4000);
