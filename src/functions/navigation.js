
function nav(document){

    const profile = document.getElementsByClassName("header__profile");
    const products = document.getElementsByClassName("header__logo");
    const car = document.getElementsByClassName("header__car");
    console.log(profile)
    if(profile){
        profile[0].addEventListener("click",(e)=>{
            window.location.href = "./login.html"
        });
    }
    if(products){
        products[0].addEventListener("click",(e)=>{
            window.location.href = "./LS products.html"
        });
    }
    
    if(car){
        car[0].addEventListener("click",(e)=>{
            window.location.href = "./car.html"
        });
    }
}

export {nav}

