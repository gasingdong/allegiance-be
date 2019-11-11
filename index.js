require("dotenv").config();
require("express-async-errors");

const PORT = process.env.PORT || 5000;

const server = require("./api/server").listen(PORT, () => {
  console.log(`\n* Server Running on port ${PORT} *\n`);
});

const io = require("socket.io")(server);

const clients = {};

io.on("connection", socket => {
  console.log("New connection id: " + socket.id);

  socket.on("join", data => {
    console.log("received", data);
    clients[data.id] = socket.id;
    console.log(clients);
  });

  socket.on("send notification", data => {
    data.userIds.forEach(id => {
      const socketid = clients[id];
      console.log("send notification");
      io.to(socketid).emit("new notification", data);
      // if the user is online lets find his socket id,
    });
  });

  socket.on("send invite", data => {
    data.userIds.forEach(id => {
      const socketid = clients[id];
      console.log("send invite");
      io.to(socketid).emit("new invite", data);
      // if the user is online lets find his socket id,
    });
  });

  socket.on("disconnect", () => {
    console.log("disconnected id: " + socket.id);
  });
});
