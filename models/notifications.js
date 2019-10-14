const db = require("../data/db-config");

module.exports = {
  getNotificationsByUserId,
  addNotificationToUser
};

function getNotificationsByUserId(user_id) {
  return db("notifications")
    .join("users", "id", "invoker_id")
    .where({ user_id });
}

function addNotificationToUser(user_id, invoker_id, type_id, type) {
  return db("notifications").insert({
    user_id,
    invoker_id,
    type_id,
    type
  });
}
