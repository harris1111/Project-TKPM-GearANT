const productService = require("./productService");
const { ObjectId } = require("mongodb");
const orderService = require("../order/orderService");
const alert = require('alert'); 
exports.list = async function (req, res) {
  // try {

  let query = { ...req.query };

  let page;
  if (query.page === undefined) {
    page = 1;
  } else if (query.page < 0) {
    page = 1;
  } else {
    page = parseInt(query.page);
  }
  const excludedFields = ["page"];
  excludedFields.forEach((el) => delete query[el]);

  const keyword = query.keyword ? query.keyword : 0;
  const category = query.category ? query.category : 0;
  const gen = query.gen ? query.gen : 0;
  const sort = query.sort ? query.sort : 0;

  const activeJacket = category == "Jacket" ? true : false;
  const activeShirt = category == "T-shirt" ? true : false;
  const activeBack = category == "Backpack" ? true : false;
  const activeJeans = category == "Jeans" ? true : false;
  const activeShoe = category == "Shoe" ? true : false;
  const activeHoodie = category == "Hoodie" ? true : false;
  const activePant = category == "Pant" ? true : false;

  const activePopular = gen == "Popular" ? true : false;
  const activeNew = gen == "New" ? true : false;
  const activeHot = gen == "Hot" ? true : false;
  const activeLimited = gen == "Limited" ? true : false;


  const categoryString = category != 0 ? "&category=" + category : "";
  const keywordString = keyword != 0 ? "&keyword=" + keyword : "";
  const genString = gen != 0 ? "&gen=" + gen : "";
  const sortString = sort != 0 ? "&sort=" + sort : "";

  const products = await productService.listProducts(page, query);

  let totalPage = await productService.totalProductNum(query);
  totalPage = Math.ceil(totalPage / 3);
  res.render("products/views/product", {
    page: page, // Current Page
    totalPage, // Total Page
    products: products,
    keyword: keyword,
    category: category,
    gen: gen,
    sort: sort,
    activeJacket,
    activeShirt,
    activeBack,
    activeJeans,
    activeShoe,
    activeHoodie,
    activePant,
    activePopular,
    activeHot,
    activeNew,
    activeLimited,
    categoryString,
    keywordString,
    genString,
    sortString,
  });
  // } catch {
  //   res.render("error");
  // }
};

exports.item = async function (req, res) {
  try {
    const product = await productService.viewOne(ObjectId(req.params.id));
    product._id = product._id.toString();
    const query = { brand: product.brand };
    Relatedproducts = await productService.listRelatedProducts(1, query);
    console.log(Relatedproducts.length);
    for (let i = 0; i < Relatedproducts.length; i++) {
      if (Relatedproducts[i].name === product.name) {
        Relatedproducts.splice(i, 1);
      }
    }

    res.render("products/views/product_detail", { product, Relatedproducts });
  } catch {
    res.render("error");
  }
};

exports.review = async function (req, res) {

  const product = req.body;
  currentProduct = await productService.viewOne(req.params.id);
  try {

    if (currentProduct.review_detail === undefined) {
      currentProduct.review_detail = new Array();
    }

    console.log(currentProduct.review_detail);
    var feed = { username: product["name"], comment: product["your_review"] };
    currentProduct.review_detail.push(feed);
    currentProduct.review = currentProduct.review + 1;

    console.log(currentProduct);
    await productService.update(currentProduct);
    res.redirect("/product/" + req.params.id);
  }
  catch {
    res.render("error");
  }
}

exports.order = async function (req, res) {
  let currentOrder;
  let outOfStock=false;
  if (!req.user) {
    res.redirect("/login");
  } else {
    currentOrder = await orderService.viewOrder(req.user._id);
    if (currentOrder === null || currentOrder.DateOfPurchase) {
      const subtotal = req.body.price * req.body.quantity;

      const item = {
        productid: req.body.productid,
        image: req.body.image,
        productName: req.body.productName,
        price: req.body.price,
        quantity: Math.floor(req.body.quantity),
        subtotal: subtotal,
      }
      const curProduct= await productService.viewOne(req.body.productid);
      console.log(curProduct.availability);
      console.log(req.body.quantity);
      if(Number(curProduct.availability) < Number(req.body.quantity)){
        var string = encodeURIComponent('true');
        res.redirect("/cart/?outofstock="+string);
      }
      else{
        if(!curProduct.saleNumber){
          curProduct.saleNumber=req.body.quantity;
        }else{
          curProduct.saleNumber+=req.body.quantity;
        }
        curProduct.availability-=req.body.quantity;
        await productService.update(curProduct);
        await orderService.makeOrder(req.user, req.body, item, subtotal);
        res.redirect("/cart");
      }

    } else {

      //Add more

      let isNewProduct = 1;
      for (let i = 0; i < currentOrder.item.length; ++i) {
        if (currentOrder.item[i].productName === req.body.productName) {
          currentOrder.item[i].subtotal = req.body.quantity * req.body.price;
          currentOrder.total += (req.body.quantity - currentOrder.item[i].quantity) * req.body.price;
          const curProduct= await productService.viewOne(req.body.productid);
          curProduct.saleNumber = curProduct.saleNumber + (Number(req.body.quantity) -Number(currentOrder.item[i].quantity));
          const currentQuantity =  Number(currentOrder.item[i].quantity);
          currentOrder.item[i].quantity = Math.floor(req.body.quantity);
          isNewProduct = 0;
          if(Number(curProduct.availability) +Number(currentOrder.item[i].quantity) < Number(req.body.quantity)){
            var string = encodeURIComponent('true');
            res.redirect("/cart/?outofstock="+string);
          }else{

            curProduct.availability += (currentQuantity-Number(req.body.quantity));

            await productService.update(curProduct);
            await orderService.updateOrder(currentOrder);
            res.redirect("/cart");
          }
        }
      }
      if (isNewProduct === 1) {
        let subtotal = req.body.price * req.body.quantity;

        const newitem = {
          productid: req.body.productid,
          image: req.body.image,
          productName: req.body.productName,
          price: req.body.price,
          quantity: req.body.quantity,
          subtotal: subtotal,
        }
        currentOrder.item.push(newitem);
        currentOrder.total += subtotal;
        const curProduct= await productService.viewOne(req.body.productid);
        if(!curProduct.saleNumber){
          curProduct.saleNumber=req.body.quantity;
        }else{
          curProduct.saleNumber+=req.body.quantity;
        }
        if(Number(curProduct.availability) < Number(req.body.quantity)){
          var string = encodeURIComponent('true');
          res.redirect("/cart/?outofstock="+string);
        }else{
          curProduct.availability-=req.body.quantity;
          await productService.update(curProduct);
          await orderService.updateOrder(currentOrder);
          res.redirect("/cart");
        }
      }

    }

  }
}