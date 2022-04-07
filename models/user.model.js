import db from '../utils/db.js';

export default {
    async findById(id) {
        const list = await db('user').where('id', id);
        if (list.length === 0)
            return null;

        return list[0];
    },

    async findByUsername(username) {
        const list = await db('user').where('username', username);
        if (list.length === 0)
            return null;

        return list[0];
    },

    add(entity) {
        return db('user').insert(entity);
    },

    del(id) {
        return db('user')
            .where('id', id)
            .del();
    },

    patch(entity) {
        const id = entity.id;
        delete entity.id;

        return db('user')
            .where('id', id)
            .update(entity);
    },
}