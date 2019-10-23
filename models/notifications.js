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

  return results.reduce(async (prev, note) => {
      try {
        const acc = await prev;
        if (note.type === "reply_like") {
          const reply = await Replies.find({ "r.id": note.type_id }).first();
          if(reply) {
            acc.push({
              ...note,
              reply_content: reply.reply_content
            });
          }
        } else {
          const post = await Posts.find({ "p.id": note.type_id }).first();
          if(post){
            acc.push({
            ...note,
            post_content: post.post_content
            });
          }
        }
        return acc;
      } catch (err) {
        console.log(err);
      }
    }, Promise.resolve([]));
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
    .del()
    .returning("*");
}
