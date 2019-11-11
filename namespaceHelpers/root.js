const clients = {};

module.exports = (socket, namespace, io) => {
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
};
