const db = require("../data/db-config");

module.exports = {
  findByUserId,
  addToUser
};

function findByUserId(user_id) {
  return db("notifications")
    .join("users", "users.id", "invoker_id")
    .where({ user_id });
}

function addToUser(user_id, invoker_id, type_id, type) {
  return db("notifications").insert({
    user_id,
    invoker_id,
    type_id,
    type
  });
}
