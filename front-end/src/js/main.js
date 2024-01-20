import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import {auth} from './firebase.js'
import { getAuth, onAuthStateChanged } from "firebase/auth";

const provider = new GoogleAuthProvider();

const btnSendElm = document.querySelector('#btn-send');
const btnSignInElm = document.querySelector('#btn-sign-in');
const btnSignOutElm = document.querySelector('#btn-sign-out');
const txtMsgElm = document.querySelector('#txt-message');
const outputElm = document.querySelector('#output');
const accountElm = document.querySelector('#account');
const userNameElm = document.querySelector('#user-name');
const userEmailElm = document.querySelector('#user-email');
const overlayElm = document.querySelector('#login-overlay');
const user = {
    email: null,
    name: null,
    picture: null
};

let ws = null;


btnSignInElm.addEventListener('click', ()=>{
    signInWithPopup(auth, provider)
      .then(res => {
        user.name = res.user.displayName;
        user.email = res.user.email;
        user.picture = res.user.photoURL;
        overlayElm.classList.add('d-none');
        finalizedLoginDetails();
      }).catch(err => alert("Failed to Sign In"));
});

function finalizedLoginDetails(){
    userNameElm.innerText = user.name;
    userEmailElm.innerText = user.email;
    accountElm.style.backgroundImage = `url(${user.picture})`;
}

accountElm.addEventListener('click', (e)=>{
    accountElm.querySelector('#account-details')
    .classList.remove('d-none');
    e.stopPropagation();
});

document.addEventListener('click', ()=> {
    accountElm.querySelector("#account-details")
        .classList.add('d-none');
});


btnSendElm.addEventListener('click', ()=>{
const message = txtMsgElm.value.trim();
if(!message) return;

const msgObj = {
    message,
};

addChatMessageRecord(msgObj);
txtMsgElm.value = "";
txtMsgElm.focus();
});


function addChatMessageRecord({message}){
    const messageElm = document.createElement('div');
    messageElm.classList.add('message');
    outputElm.append(messageElm);
    messageElm.innerText = message;
}