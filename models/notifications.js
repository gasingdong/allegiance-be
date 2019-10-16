const db = require("../data/db-config");

const Posts = require("../models/posts");

module.exports = {
  findByUserId,
  addToUser
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
      "n.id");
  
  return Promise.all(results.map(async (note) => {
    try {
      const post = await Posts.find({ "p.id": note.type_id }).first();
      return {
        ...note,
        post_content: post.post_content
      }
    } catch (err) {
      console.log(err);
    }
  }));
}

function addToUser(user_id, invoker_id, type_id, type) {
  return db("notifications").insert({
    user_id,
    invoker_id,
    type_id,
    type
  });
}
