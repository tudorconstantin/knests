exports.up = async function (knex) {
    try {
        await knex.schema.createTable('roles', function (t) {
            t.uuid('role_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
            t.string('code').notNullable();
            t.string('name').notNullable();

            t.unique(['code']);
        });

        await knex.schema.createTable('users_roles', function (t) {
            t.uuid('user_role_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
            t.uuid('user_id').notNullable();
            t.uuid('role_id').notNullable();

            t.foreign('user_id').references('user_id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
            t.foreign('role_id').references('role_id').inTable('roles').onUpdate('CASCADE').onDelete('CASCADE');

            t.unique(['user_id', 'role_id']);
        });

        await knex('roles').insert(
            [
                {
                    'code': 'ADMIN',
                    'name': 'Administrator',
                },
                {
                    'code': 'NORMAL',
                    'name': 'Regular',
                },
                {
                    'code': 'ANONYMOUS',
                    'name': 'Anonymous',
                },
            ],
        );

    } catch (e) {
        console.error('Error setting up migrations', e.message, e.stack, e);
        throw (e);
    }

};

exports.down = async function (knex) {
    try {
        await knex.schema.dropTable('users_roles');
        await knex.schema.dropTable('roles');
    } catch (e) {
        console.error('Error reverting', e.message, e.stack, e);
        throw (e);
    }
};
