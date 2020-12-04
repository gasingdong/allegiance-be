const { Client } = require('pg');

const pgclient = new Client({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
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
