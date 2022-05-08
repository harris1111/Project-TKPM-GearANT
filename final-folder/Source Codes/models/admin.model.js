import db from "../utils/db.js";

export default {
  async delProduct(id) {
    await db("product").where("ProID", id).del();
  },
  async countUser() {
    const list = await db.select().from("user").count({ amount: "Username" });
    return list[0].amount;
  },
  async addProduct(entity) {
    return db("product").insert(entity);
  },
  async editProduct(entity) {
    const id = entity.id;
    delete entity.id;
    return db("product").where("ProID", id).update(entity);
  },
  async updateStateOrder(entity) {
    const id = entity.orderID;
    delete entity.orderID;
    return db("order_list").where("OrderID", id).update(entity);
  },
  async getOrderList() {
    const sql = `select ol.OrderID, Name, User, Date, State, od.ProID, p.ProName, Price, od.Stock
                 from order_list ol
                   join order_detail od
                 on ol.OrderID = od.OrderID
                   join product p on od.ProID = p.ProID
                   join user u
                   on ol.User = u.Username
                 order by State, Date desc`;
    const raw = await db.raw(sql);
    return raw[0] || null;
  },
  async getUserListLimit(limit, offset) {
    const sql = `SELECT *
                     from user
                     order by Type desc
                         limit ${limit}
                     offset ${offset}`;
    const ret = await db.raw(sql);
    return ret[0];
  },
  async getProStockDetail(id) { 
    const sql = `SELECT od.ProID, od.Stock 
    from order_detail od
    join product p on p.ProID = od.ProID
    where OrderID = ${id}`
    const ret = await db.raw(sql);
    return ret[0];
  },
  async getProStock(id) { 
    const sql =`SELECT Stock from product where ProID=${id}`
    const ret = await db.raw(sql);
    return ret[0][0];
  }
};
