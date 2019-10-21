require("dotenv").config();
require("express-async-errors");
const server = require("./api/server");

const PORT = process.env.PORT || 5000;

const http = require("http").createServer(server);
const io = require("socket.io")(http);

const clients = {};

io.on("connection", socket => {
  console.log("New connection id: " + socket.id);

  socket.on("join", data => {
    console.log("received", data);
    clients[data.id] = socket.id;
    console.log(clients);
  });

  socket.on("send notification", data => {
    console.log("send notification");
    data.userIds.forEach(id => {
      const socketid = clients[id];
      io.to(socketid).emit("new notification");
    });
  });

  socket.on("disconnect", () => {
    console.log("disconnected id: " + socket.id);
  });
});

http.listen(PORT, () => {
  console.log(`\n* Server Running on port ${PORT} *\n`);
});
