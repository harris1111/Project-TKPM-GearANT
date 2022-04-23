import db from '../utils/db.js';

export default {
    async addOrdDetail(entity) {
        return db('order_detail').insert(entity);
    },
}