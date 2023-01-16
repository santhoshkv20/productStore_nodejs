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
    const {title,description,price,image} = req.body
    console.log(title,description,price,description)
    let product = new Product(title,description,image,price).save()
    res.redirect('/');
}


exports.getProducts = (req,res,next)=>{
    const product = Product.fetchAll((products)=>{
        console.log(product)
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin product',
            path: 'admin/products',
          });

    });
}
