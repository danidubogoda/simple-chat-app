const btnSendElm = document.querySelector('#btn-send');
const btnSignInElm = document.querySelector('#btn-sign-in');
const btnSignOutElm = document.querySelector('#btn-sign-out');
const txtMsgElm = document.querySelector('#txt-message');
const outputElm = document.querySelector('#output');
const accountElm = document.querySelector('#account');
const userNameElm = document.querySelector('#user-name');
const userEmailElm = document.querySelector('#user-email');
const overlayElm = document.querySelector('#login-overlay');



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