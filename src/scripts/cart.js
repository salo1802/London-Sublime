import { auth, db } from "./app";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseCart, createFirebaseCart } from "../functions/cart";
import { addProductToCart } from "../utils";
import { getMyLocalCart, currencyFormat } from "../utils/index";
import {nav} from "../functions/navigation"
import{addDoc, collection} from "firebase/firestore"
import { async } from "@firebase/util";
//nav

   nav(document);

const cartSection = document.getElementById("cart");
const totalSection = document.getElementById("total");
const buyBtn = document.getElementById("buy");
const cartForm = document.getElementById("cartform");
const cancelBtn = document.getElementById("cancel");
let cart = [];

cartForm.hidden = true;

let totalGobal = 0;
function loadCart(cart) {
    let total = 0;
    cart.forEach(product => {
        renderProduct(product);
        total += parseInt(product.price);
        totalGobal += parseInt(product.price);
    });

    totalSection.innerText = "Total: "+currencyFormat(total);
};

async function removeProduct(productId) {
    const newCart = cart.filter(product => product.id !== productId);
    
    cart = newCart;

    if (userLogged) {
        await createFirebaseCart(db, userLogged.uid, newCart);
    }

    addProductToCart(newCart);

    cartSection.innerHTML = "";

    loadCart(newCart);

}


function renderProduct(product) {
    const productCart = document.createElement("li");
    productCart.className = "product flex";
    productCart.innerHTML = `
    <img src="${product.images[0]}" class="product__image">
    <div class="info">
    <h2 class="product__name">${product.name}</h2>
    <h3 class="product__price">${currencyFormat(product.price)}</h3>
    <input class="product__color" type="color" value="${product.colors[0]}"
    </div>
    <button class="product__delete">Delete</button>
    `;

    cartSection.appendChild(productCart);

    productCart.addEventListener("click", e => {
         if (e.target.tagName === "BUTTON") {
             console.log("remove it!");
             removeProduct(product.id);
         }
    })
};

onAuthStateChanged(auth, async (user) => {
    if (user) {
     
      userLogged = user;
      cart = await getFirebaseCart(db, userLogged.uid);
    } else {
        cart = getMyLocalCart();
     
    }

    loadCart(cart);

  });


buyBtn.addEventListener("click",()=>{
    cartForm.hidden = false;
})

cancelBtn.addEventListener("click",()=>{
    cartForm.hidden = true;
})
  //make the purchase
  currentTime = new Date();
 cartForm.addEventListener("submit",  (e) => {
    e.preventDefault();
    if(userLogged){
        console.log(userLogged.uid)
        try {

            cart.forEach(product => {
                total += parseInt(product.price.value);
            });

            let order = {
                user: userLogged.uid,
                order: cart,
                address: cartForm.address.value,
                username: cartForm.name.value,
                useremail: cartForm.email.value,
                phone: cartForm.phone.value,
                zip: cartForm.zip.value,
                date: currentTime,
                total: total
            }
            console.log("Order made");
           
          addDoc(collection(db,"users/"+userLogged.uid+ "/orders" ), order).then(
            alert("Your order has been made! "));
           
            cartForm.hidden = true;
           
            
            
            
        } catch(e) {
            console.log(e);
        }
    }
});


  