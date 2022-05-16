import { db, auth } from "./app";
import { onAuthStateChanged } from "firebase/auth";
import { getProduct } from "../functions/getProduct";
import { getFirebaseCart, createFirebaseCart } from "../functions/cart";
import { getMyLocalCart, addProductToCart, currencyFormat } from "../utils";
import {nav} from "../functions/navigation"
import { enableNetwork } from "@firebase/firestore";

//nav

   nav(document);

 
   
   const productInfoSection = document.getElementById("productInfo");
   const productAssetsSection = document.getElementById("productAssets");
   let colorDiv = document.createElement("div");
   
   let userLogged = undefined;
   let cart = [];
   let actualImage = 0;
   
   function getParam(param) {
       const url = window.location.search;
       const searchParams = new URLSearchParams(url);
       const productId = searchParams.get(param);
       return productId;
   }
   
   async function loadProduct() {
       const productId = getParam("id"); // http://localhost:1234/product.html?id=TXQ9Wf1GIoAOJLkIEMYo&age=20
   
       const data = await getProduct(productId);
   
       const product = {
           ...data,
           id: productId, // docSnap.id,
       }
   
       renderProduct(product);
   }
   
   function renderProduct(product) {
    product.colors.forEach((color, index)=>{
        newColor = document.createElement("button");
        newColor.className = "product__colors";
        newColor.style.backgroundColor = color;
        newColor.value = index;
        colorDiv.appendChild(newColor);
    })


      productAssetsSection.innerHTML = `
       <img class="product__mainImage" id="mainImage" src="${product.images[0]}">`;
   
       const isProductAddedToCart = cart.some((productCart) => productCart.id === product.id);
   
       const productButtonCart = isProductAddedToCart ?
       '<button class="product__cart" disabled>Added to cart</button>' :
       '<button class="product__cart">Add to cart</button>';
   
       productInfoSection.innerHTML = `
       <h1 class="product__name">${product.name}</h1>
       <h3 class="product__price">${currencyFormat(product.price)}</h3>
       ${colorDiv.innerHTML}
       <label class="custom-file-upload">
       <input required multiple=false accept=".png,.jpg,.jpeg" class="productImage" type="file" name="productImage">
       upload the image you want to put in
        </label>
       ${productButtonCart}`;
   

       
   
       const productCartButton = document.querySelector(".product__cart");
       productCartButton.addEventListener("click", e => {
           cart.push(product);
   
           addProductToCart(cart);
   
           if (userLogged) {
               createFirebaseCart(db, userLogged.uid, cart);
           }
   
           productCartButton.setAttribute("disabled", true);
           productCartButton.innerText = "Added to cart";
       });

       const mainImage = document.getElementById("mainImage");

       const btns = document.querySelectorAll('.product__colors');
    for (const btn of btns) {
    btn.addEventListener('click', function() {
        console.log(mainImage.src)
    mainImage.src = product.images[this.value];
    console.log(mainImage.src)
  });
}
   
   

   
   
       
   
   }
   
   onAuthStateChanged(auth, async (user) => {
       if (user) {
         // User is signed in, see docs for a list of available properties
         // https://firebase.google.com/docs/reference/js/firebase.User
         userLogged = user;
         cart = await getFirebaseCart(db, userLogged.uid);
         console.log(cart);
         // ...
       } else {
           cart = getMyLocalCart();
         // User is signed out
         // ...
       }
   
       loadProduct();
   
     });