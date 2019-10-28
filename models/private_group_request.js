const db = require('../data/db-config');

module.exports = {
    findByUserId,
    findGroupById,
    privateInvitation,
    deleteInvitation,
}

function findByUserId(user_id){
    return db('join_private_group_request').where({ user_id });
}

function findGroupById(group_id){
    return db('join_private_group_request as g')
        .where({ group_id })
        .join('users as u', 'u.id', 'g.user_id')
        .select('u.email', 'u.username');
}

function privateInvitation(user_id, group_id) {
    return db('join_private_group_request')
        .insert({ user_id, group_id})
        .returning('*');
}

function deleteInvitation(group_id, user_id) {
    return db("join_private_group_request")
      .where({ group_id, user_id })
      .del()
      .returning("*");
  }