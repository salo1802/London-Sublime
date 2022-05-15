// Import the functions you need from the SDKs you need
import { doc } from "@firebase/firestore";
import { storage, db } from "./app";
import { addProduct, uploadImages } from "../functions/addProduct";
import { connectStorageEmulator } from "@firebase/storage";


const createProductForm = document.getElementById("createForm");
const addButton = document.getElementById("addColor");
const submiter = document.getElementById("submiter");
let colors = [...document.getElementsByClassName("productColor")];
let images = [...document.getElementsByClassName("productImage")];
let colorList = [];
let imagesList = [];

//añadir color
addButton.addEventListener("click", (e)=>{
    e.preventDefault();
    colors = [...document.getElementsByClassName("productColor")];
    images = [...document.getElementsByClassName("productImage")];
    console.log("entro")
    let div  = document.getElementById("formcontent")
    let newColor = document.createElement("div");
   
    
    newColor.innerHTML = `
    <h2 class="formtitles">Color</h2>
    <input class="productColor" type="color">
    <h2 class="formtitles">Image</h2>
    <input required multiple=`+false +` accept=".png,.jpg,.jpeg" class="productImage" type="file">
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
    images.forEach((images)=>{
        console.log(images.files[0]);
        imagesList.push(images.files[0]);
    })

    colorList.length = 0;
       colors.forEach(color =>{
           colorList.push(color.value);
       })

    console.log(imagesList);
    console.log(colorList)
    const name = createProductForm.name.value;
    const price = createProductForm.price.value;
    const category = createProductForm.category.value;
   

    
    
    let gallery = [];
    
    if (imagesList.length) {
        // Vamos a subir las imagenes a firestore
        const uploadedImages = await uploadImages(storage, imagesList);

        gallery = await Promise.all(uploadedImages);
    }

    const newProduct = {
        name,
        price,
        category,
        images: gallery,
        colors: colorList
    };

    await addProduct(db, newProduct);
    //console.log(images);
   // console.log(colors);
});