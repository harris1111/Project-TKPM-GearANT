import db from '../utils/db.js';

export default {
    async addOrdDetail(entity) {
        return db('order_detail').insert(entity);
    },

    update(entity) {
        const OrderID = entity.OrderID;
        delete entity.OrderID;

        return db('order_list')
            .where('OrderID', OrderID)
            .update(entity);
    },
}