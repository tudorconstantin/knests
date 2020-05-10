const { onUpdateTrigger } = require('../../knexfile');

exports.up = async function (knex) {
  try {
    const UUID_EXTENSION = 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";';
    await knex.raw(UUID_EXTENSION);
    const ON_UPDATE_TIMESTAMP_FUNCTION = `
  CREATE OR REPLACE FUNCTION on_update_timestamp()
  RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = now();
    RETURN NEW;
  END;
$$ language 'plpgsql';    
`;
    await knex.raw(ON_UPDATE_TIMESTAMP_FUNCTION);

    await knex.schema.createTable('users', function (t) {
      t.uuid('user_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      t.string('email').notNullable();
      t.string('password').notNullable();
      t.string('status').notNullable().default('UNCONFIRMED');
      t.timestamp('last_login').notNullable().default(new Date('2100-01-01').toISOString());
      t.timestamps(true, true);

      t.unique(['email']);
    })
      .then(() => knex.raw(onUpdateTrigger('users')));

  } catch (e) {
    console.error('Error setting up migrations', e.message, e.stack, e);
    throw (e);
  }

};

exports.down = async function (knex) {
  try {
    await knex.schema.dropTable('users');
    const DROP_ON_UPDATE_TIMESTAMP_FUNCTION = 'DROP FUNCTION IF EXISTS on_update_timestamp() CASCADE';
    await knex.raw(DROP_ON_UPDATE_TIMESTAMP_FUNCTION);
  } catch (e) {
    console.error('Error reverting', e.message, e.stack, e);
    throw (e);
  }
};
