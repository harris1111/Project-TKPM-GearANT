import fn from 'knex';

export const connectionInfo = {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    database: 'gearANT'
}

const knex = fn({
    client: 'mysql2',
    connection: connectionInfo,
    pool: { min: 0, max: 10 }
});

export default knex;