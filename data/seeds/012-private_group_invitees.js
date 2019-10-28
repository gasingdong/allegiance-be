
exports.seed = function(knex) {
  // Deletes ALL existing entries
  
      // Inserts seed entries
      return knex('join_private_group').insert([
        {user_id: 1, group_id: 2}
      ]);
   };
