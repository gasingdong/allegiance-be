require("dotenv").config();
require("express-async-errors");
const namespaceHelper = require("./namespaceHelpers");

const PORT = process.env.PORT || 5000;

const server = require("./api/server").listen(PORT, () => {
  console.log(`\n* Server Running on port ${PORT} *\n`);
});

const io = require("socket.io")(server);

const namespaceHandler = (namespace, helper) => {
  return socket => {
    helper(socket, namespace, io);
  };
};

const root = io.of("/");

root.on("connection", namespaceHandler(root, namespaceHelper.root));
