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
const { API_BASE_URL } = process.env;
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
        finalizedLogin();
      }).catch(err => alert("Failed to Sign In"));
});

function finalizedLogin(){
    userNameElm.innerText = user.name;
    userEmailElm.innerText = user.email;
    accountElm.style.backgroundImage = `url(${user.picture})`;
}

btnSignOutElm.addEventListener('click', (e)=>{
    accountElm.querySelector("#account-details")
        .classList.add('d-none');
    e.stopPropagation();
    signOut(auth);
});

accountElm.addEventListener('click', (e)=>{
    accountElm.querySelector('#account-details')
    .classList.remove('d-none');
    e.stopPropagation();
});

document.addEventListener('click', ()=> {
    accountElm.querySelector("#account-details")
        .classList.add('d-none');
});


onAuthStateChanged(auth, (loggedUser) =>{
    if(loggedUser){
        user.email = loggedUser.email;
        user.name = loggedUser.displayName;
        user.picture = loggedUser.photoURL;
        finalizedLogin();
        overlayElm.classList.add('d-none');
    if(!ws){                                                        //02
        ws = new WebSocket(`${API_BASE_URL}/messages`);
        ws.addEventListener('error', () => {
            alert("Connection failer, try refreshing the application");
        });
        ws.addEventListener('message', loadNewChatMessages);
        }
    }else{
        user.email = null;
        user.name = null;
        user.picture = null;
        overlayElm.classList.remove('d-none');
        if(ws) {
            ws.close();                    
            ws = null;
        }
    }
});



btnSendElm.addEventListener('click', ()=>{
const message = txtMsgElm.value.trim();
if(!message) return;

const msgObj = {
    message,
    email: user.email
};

    ws.send(JSON.stringify(msgObj));
    addChatMessageRecord(msgObj);
    outputElm.scrollTo(0, outputElm.scrollHeight);
    txtMsgElm.value = "";
    txtMsgElm.focus();
});


function addChatMessageRecord({message, email}){
    const messageElm = document.createElement('div');
    messageElm.classList.add('message')
    if (email === user.email){
        messageElm.classList.add('me');
    }else{
        messageElm.classList.add('others');
    }
    outputElm.append(messageElm);
    messageElm.innerText = message;
}



function loadNewChatMessages(e){
    const msg = JSON.parse(e.data);        
    addChatMessageRecord(msg);
    
}