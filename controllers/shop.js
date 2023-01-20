const Cart = require("../model/cart");
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
    Cart.fetchAll((cart) => {
        Product.fetchAll((products) => {
            const cartProducts = []
            for (let product of products) {
                const cartData = cart.products.find(prod => prod.id === product.id)
                if (cartData) {
                    cartProducts.push({ productData: product, qty: cartData.qty })
                }

            }
            res.render("shop/cart", {
                path: "/cart",
                pageTitle: "Cart",
                prods: cartProducts
            })
        })

    })
}

exports.deletCartItem = (req, res, next) => {
    console.log("req.params.productId ",req.body)
    const prodId = req.body.productId
    Product.fetchById(prodId, product => {
        console.log(product)
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
      });
}

exports.postCart = (req,res,next)=>{
const productId = req.body.productId
Product.fetchById(productId,(product)=>{
Cart.addProduct(productId,product.price)
})
res.redirect("/cart")
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