import db from '../utils/db.js';
import productModel from '../models/product.model.js';

export default {
    async updateAdmin(entity) {
        const username = res.Username;
        delete entity.Username;
        return db('order_list').where('username', username).update(entity);
    }
}