import { db, auth } from "./app";
import { onAuthStateChanged } from "firebase/auth";
import { getProducts } from "../functions/products";
import { createFirebaseCart, getFirebaseCart  } from "../functions/cart";
import { addProductToCart, getMyLocalCart, currencyFormat } from "../utils";


import {nav} from "../functions/navigation"
import { getUser } from "../functions/getUser";

//nav

   nav(document);

const productSection = document.getElementById("products");
const categoryFilter = document.getElementById("category");
const orderFilter = document.getElementById("order");
const addButton = document.getElementById("addProduct")

let userLogged = undefined;
let products = [];
let cart = [];


async function loadProducts() {
    const firebaseProducts = await getProducts(db);
    productSection.innerHTML = "";
    firebaseProducts.forEach(product => {
        renderProduct(product);
    });

    products = firebaseProducts;
}

function renderProduct(item) {
    const product = document.createElement("a");
    product.className = "product";

    product.setAttribute("href", `./product.html?id=${item.id}`);

    const coverImage = item.images ? item.images[0] : "https://cdn1.iconfinder.com/data/icons/business-company-1/500/image-512.png";

    const isProductAddedToCart = cart.some((productCart) => productCart.id === item.id);

    const productButtonCart = isProductAddedToCart ?
    '<button class="product__cart" disabled>Producto añadido</button>' :
    '<button class="product__cart">Añadir al carrito</button>';

    product.innerHTML = `
    <img src="${coverImage}" alt="" class="product__image">
    <div class="product__info">
        <h2 class="product__name">${item.name}</h2>
        <p class="product__category">${item.category}</p> 
        <h3 class="product__price">${currencyFormat(item.price)}</h3>
        ${productButtonCart}
    </div>
    `;

    productSection.appendChild(product);

    const productCartButton = product.querySelector(".product__cart");

    productCartButton.addEventListener("click", async (e) => {
        e.preventDefault(); // evitar que al dar click en el boton, funcione el enlace del padre.

        cart.push(item);
        addProductToCart(cart);

        if (userLogged) {
            await createFirebaseCart(db, userLogged.uid, cart);
        }

        productCartButton.setAttribute("disabled", true);
        productCartButton.innerText = "Producto añadido";

    });
}

function filterBy(){
    const newCategory = categoryFilter.value;
    const newOrder = orderFilter.value;

    let filteredProducts = [];

    if (newCategory !== "") {
        filteredProducts = products.filter((product) => product.category === newCategory);
    } else {
        filteredProducts = products;
    }

    if (newOrder === "asc") {
        filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
    }

    if (newOrder === "desc") {
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
    }

    if (newOrder === "color") {
        filteredProducts = filteredProducts.sort((a, b) => b.colors.length - a.colors.length );
    }
    
    productSection.innerHTML = "";
    filteredProducts.forEach(product => {
        renderProduct(product);
    });

}

categoryFilter.addEventListener("change", e => {
    filterBy();
});

orderFilter.addEventListener("change", e => {
    filterBy();
});

onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      
      userLogged = user;
      
      cart = await getFirebaseCart(db, userLogged.uid);

      userObject = await getUser(userLogged.uid);
        if(userObject.isAdmin==true){
            addButton.innerHTML = `<a  href="./newproduct.html">+</a>`
        }else{
            addButton.innerHTML = ``;
        }
      // ...
    } else {
        cart = getMyLocalCart();
        addButton.innerHTML = ``;
      // User is signed out
      // ...
    }

    loadProducts();

  });