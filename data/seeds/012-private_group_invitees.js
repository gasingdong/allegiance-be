
exports.seed = function(knex) {
  // Deletes ALL existing entries
  
      // Inserts seed entries
      return knex('private_group_invitees').insert([
        {user_id: 1, group_id: 2}
      ]);
   };
