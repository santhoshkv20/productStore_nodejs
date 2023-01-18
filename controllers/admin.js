const Product = require("../model/product");

exports.getAddproduct =   (req, res, next) => {
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editMode:false
    });
}

const product = [];

exports.postAddProduct = (req,res,next)=>{
    const {title,description,price,imageUrl} = req.body
    console.log(title,description,price,description)
    let product = new Product(null,title,description,imageUrl,price).save()
    res.redirect('/');
}


exports.getEditproduct =   (req, res, next) => {
    const editing =req.query.edit
    if(!editing)res.redirect("/")
    const productId = req.params.productId;
    Product.fetchById(productId, product => {
        if (!product) res.redirect("/")

        res.render('admin/edit-product', {
            pageTitle: 'Add Product',
            path: '/admin/edit-product',
            product: product,
            editMode: editing
        });
    })
    
}

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId
    const { title, description, price, imageUrl } = req.body
    let product = new Product(prodId, title, description, imageUrl, price).save()
    res.redirect("/products")
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
exports.postDeletProduct = (req, res, next) => {
    const productId = req.params.productId
    Product.deletById(productId);
    res.redirect("/admin/products")
}
