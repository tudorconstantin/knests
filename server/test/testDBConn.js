const knexConn = require('../src/knexfile');

const { Pool, Client } = require('pg');

(async function main() {
  const connectionString = process.env.DATABASE_URL;
  const pool = new Pool({
    connectionString: connectionString,
  });

  pool.query('SELECT NOW()', (err, res) => {
    pool.end()
  })

  const knex = require('knex')(knexConn);

  const res = await knex.schema.createTable('test', function (t) {
    table.increments();
    table.string('name');
    table.timestamps();
  });

  const exists = await knex.schema.hasTable('test');

})();
