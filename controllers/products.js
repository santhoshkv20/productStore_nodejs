const Product = require("../model/product");

exports.getAddproduct =   (req, res, next) => {
    res.render('admin/add-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
    });
}

const product = [];

exports.postAddProduct = (req,res,next)=>{
    let product = new Product(req.body.title).save()
    res.redirect('/');
}

exports.getProduct = (req,res,next)=>{
    const product = Product.fetchAll((products)=>{
        console.log(product)
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
          });

    });
    
}