import { db, auth } from "./app.js";
import { login, createUser, addUserToDatabase } from "../functions/auth.js";
import{nav} from "../functions/navigation"
const registerink = document.getElementById("register");
const createUserForm = document.getElementById("RegisterForm");
const loginForm = document.getElementById("loginForm");
import {nav} from "../functions/navigation"

//nav

   nav(document);


createUserForm.hidden =true;



registerink.addEventListener("click",()=>{
loginForm.hidden = true;
createUserForm.hidden = false;
});

createUserForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = createUserForm.username.value;
    const email = createUserForm.email.value;
    const password = createUserForm.password.value;

    const userInfo = {
        name,
        email,
        password,
        isAdmin: false,
    };

    const newUser = await createUser(auth, userInfo);
    await addUserToDatabase(db, newUser.uid, userInfo);

    alert(`Bienvenido, ${name}`);
    login(auth, email, password);
   
});

loginForm.addEventListener("submit", e => {
    e.preventDefault();

    const email = loginForm.email.value;
    const password = loginForm.password.value;

    
    login(auth, email, password);
    
});