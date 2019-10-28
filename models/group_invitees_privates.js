const db = require('../data/db-config');

module.exports = {
    findByUserId,
    findGroupById,
    privateInvitation,
    deleteInvitation,
}

function findByUserId(user_id){
    return db('join_private_group').where({ user_id });
}

function findGroupById(group_id){
    return db('join_private_group as g')
        .where({ group_id })
        .join('users as u', 'u.id', 'g.user_id')
        .select('u.email', 'u.username');
}

function privateInvitation(user_id, group_id) {
    console.log('privateInvitation:', user_id)
    return db('join_private_group')
        .insert({ user_id, group_id})
        .returning('*');
}

function deleteInvitation(group_id, user_id, sender_id) {
    return db("group_invitees")
      .where({ group_id, user_id, sender_id })
      .del()
      .returning("*");
  }