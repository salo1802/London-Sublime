async function addProductToCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
};

function getMyLocalCart() {
    const myCart = localStorage.getItem("cart");
    return myCart ? JSON.parse(myCart) : [];
}

function currencyFormat(price) {
    return new Intl.NumberFormat("en-US", {
        style: 'currency',
        currency: 'GBP',
        minimumFractionDigits: 0
    }).format(price);
}

export {
    addProductToCart,
    getMyLocalCart,
    currencyFormat
}