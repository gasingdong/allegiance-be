require("dotenv").config();
require("express-async-errors");
const server = require("./api/server");

const PORT = process.env.PORT || 5000;

const http = require("http").createServer(server);
const io = require("socket.io")(http);

io.on("connection", socket => {
  console.log("New connection");

  socket.on("join", data => {
    console.log("something", data);
  });
});

http.listen(PORT, () => {
  console.log(`\n* Server Running on port ${PORT} *\n`);
});
