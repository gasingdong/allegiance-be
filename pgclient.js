const { Client } = require('pg');

const pgclient = new Client({
  user: 'postgres',
  password: 'postgres',
});

pgclient.connect();

const database = 'CREATE DATABASE allegiance_test'

pgclient.query(database, (err) => {
  if (err) {
    throw err
  }
});
