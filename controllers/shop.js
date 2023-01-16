const Product = require("../model/product");


exports.getProduct = (req,res,next)=>{
    const product = Product.fetchAll((products)=>{
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

exports.getIndex = (req,res,next)=>{
    const product = Product.fetchAll((products)=>{
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

exports.getCheckout = (req,res,next)=>{
    res.render("shop/checkout",{
        path:"/checkout",
        pageTitle:"Chekout"
    })
}

exports.getOrders = (req,res,next)=>{
    res.render("shop/orders",{
        path:"/orders",
        pageTitle:"Orders"
    })
}