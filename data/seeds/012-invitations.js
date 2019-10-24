exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("group_invitees").then(function() {
    // Inserts seed entries
    return knex("group_invitees").insert([
      { user_id: 1, group_id: 1 },
      { user_id: 2, group_id: 1 },
      { user_id: 3, group_id: 1 },
      { user_id: 4, group_id: 2 },
      { user_id: 3, group_id: 3 }
    ]);
  });
};
