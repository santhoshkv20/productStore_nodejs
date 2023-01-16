const Product = require("../model/product");


exports.getProduct = (req, res, next) => {
    const product = Product.fetchAll((products) => {
        console.log(product)
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All products',
            path: '/',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });

    });

}


exports.getProductDetail = (req, res, next) => {
    const productId = req.params.productId;
    Product.fetchById(productId, product => {
        console.log(product)
        res.render("shop/product-detail", {
            product: product,
            path: "/products",
            pageTitle: "product details"
        })
    })

}

exports.getIndex = (req, res, next) => {
    const product = Product.fetchAll((products) => {
        console.log(product)
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
        });

    });
}

exports.getCart = (req, res, next) => {
    res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Cart"
    })

}

exports.postCart = (req,res,next)=>{
const productId = req.body.productId
console.log(productId)
Product.fetchById(productId,(product)=>{

})
}

exports.getCheckout = (req, res, next) => {
    res.render("shop/checkout", {
        path: "/checkout",
        pageTitle: "Chekout"
    })
}

exports.getOrders = (req, res, next) => {
    res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Orders"
    })
}