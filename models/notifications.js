const db = require("../data/db-config");

const Posts = require("../models/posts");
const Replies = require("../models/replies");

module.exports = {
  findByUserId,
  addToUser,
  remove,
  find
};

async function findByUserId(user_id) {
  const results = await db("notifications as n")
    .join("users as u", "u.id", "n.invoker_id")
    .where({ user_id })
    .select(
      "n.user_id",
      "n.invoker_id",
      "n.type_id",
      "n.type",
      "n.read",
      "n.created_at",
      "u.username",
      "u.first_name",
      "u.last_name",
      "u.image",
      "n.id"
    );

  return Promise.all(
    results.map(async note => {
      try {
        if (note.type === "reply_like") {
          const reply = await Replies.find({ "r.id": note.type_id }).first();
          return {
            ...note,
            reply_content: reply.reply_content
          };
        } else {
          const post = await Posts.find({ "p.id": note.type_id }).first();
          return {
            ...note,
            post_content: post.post_content
          };
        }
      } catch (err) {
        console.log(err);
      }
    })
  );
}

function addToUser(user_id, invoker_id, type_id, type) {
  return db("notifications").insert({
    user_id,
    invoker_id,
    type_id,
    type
  });
}

function find(id) {
  return db("notifications")
    .where({ id })
    .first();
}

function remove(id) {
  return db("notifications")
    .where({ id })
    .del();
}
