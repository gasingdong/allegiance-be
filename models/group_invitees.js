const db = require("../data/db-config");

module.exports = {
  findByUserId,
  findByGroupId,
  addInvitation,
  deleteInvitation
};

function findByUserId(user_id) {
  return db("group_invitees").where({ user_id });
}

function findByGroupId(group_id) {
  return db("group_invitees as g")
    .where({ group_id })
    .join("users as u", "u.id", "g.user_id")
    .select("u.email", "u.username");
}

function addInvitation(group_id, user_id) {
  return db("group_invitees").insert({ group_id, user_id });
}

function deleteInvitation(group_id, user_id) {
  return db("group_invitees")
    .where({ group_id, user_id })
    .del()
    .returning("*");
}
