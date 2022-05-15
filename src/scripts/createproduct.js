// Import the functions you need from the SDKs you need
import { doc } from "@firebase/firestore";
import { storage, db } from "./app";
import { addProduct, uploadImages } from "../functions/addProduct";
import { connectStorageEmulator } from "@firebase/storage";


const createProductForm = document.getElementById("createForm");
const addButton = document.getElementById("addColor");
const submiter = document.getElementById("submiter");
let colors = document.getElementsByClassName("productColor");
let images = documents.getElementsByClassName("productsImages");
const numberOfColors = 0;
 

//añadir color
addButton.addEventListener("click", (e)=>{
    numberOfColors++;
    console.log("entro")
    let div  = document.getElementById("formcontent")
    let newColor = document.createElement("div");
   
    
    newColor.innerHTML = `
    <h2 class="formtitles">Color</h2>
    <input class="productColor" type="color" id="productColor">
    <h2 class="formtitles">Image</h2>
    <input class="productImage" type="file" id="productImage">
    `
     console.log(newColor.innerHTML);

    div.appendChild(newColor);
    
})






createProductForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Create a new product");

    const name = createProductForm.name.value;
    const price = createProductForm.price.value;
    const category = createProductForm.category.value;
    let images = []
    let colors = [];
   

    
    /*
    let gallery = [];

    if (images.length) {
        // Vamos a subir las imagenes a firestore
        const uploadedImages = await uploadImages(storage, [...images]);

        gallery = await Promise.all(uploadedImages);
    }

    const newProduct = {
        name,
        price,
        category,
        images: gallery,
    };

    await addProduct(db, newProduct);*/
    console.log(images);
    console.log(colors);
});