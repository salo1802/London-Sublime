// Import the functions you need from the SDKs you need
import { doc } from "@firebase/firestore";
import { storage, db } from "./app";
import { addProduct, uploadImages } from "../functions/addProduct";




import {nav} from "../functions/navigation"
import { async } from "@firebase/util";

//nav

   nav(document);
    

const createProductForm = document.getElementById("createForm");
const addButton = document.getElementById("addColor");
const submiter = document.getElementById("submiter");
let images = [...document.getElementsByClassName("productImage")];
let colors = [...document.getElementsByClassName("productColor")];
let colorList = [];
let imagesList = [];

//añadir color
addButton.addEventListener("click", (e)=>{
    e.preventDefault();

    console.log("entro")
    let div  = document.getElementById("formcontent")
    let newColor = document.createElement("div");
   
    
    newColor.innerHTML = `
    <h2 class="formtitles">Color</h2>
     <input class="productColor"  type="color">
     <h2 class="formtitles--image">Image</h2>
     <label class="custom-file-upload">
        <input required multiple=false accept=".png,.jpg,.jpeg" class="productImage" type="file">
        upload the color image
    </label>
    `
     console.log(newColor.innerHTML);

    div.appendChild(newColor);
   
    
     
    
    
})



console.log(images);






createProductForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Create a new product");
    let images = [...document.getElementsByClassName("productImage")];
    let colors = [...document.getElementsByClassName("productColor")];
    

    imagesList.length = 0;
    images.forEach(  (image)=>{
        console.log(image.files[0]);
        imagesList.push(image.files[0]);
    })

    console.log(imagesList);

    colorList = []
       colors.forEach(color =>{
           colorList.push(color.value);
       })

    console.log(imagesList);
    console.log(colorList)
    const name = createProductForm.productName.value;
    const price = createProductForm.productPrice.value;
    const category = createProductForm.category.value;
   

   
    let gallery = [];
    
    if (imagesList.length) {

        // Vamos a subir las imagenes a firestore


       const srcImages = await uploadImages(storage,[...imagesList])

        gallery = await Promise.all( srcImages);
        console.log(gallery);
    }

    const newProduct = {
        name,
        price,
        category,
       images: gallery,
        colors: colorList
    };

    await addProduct(db, newProduct);
    
  
});