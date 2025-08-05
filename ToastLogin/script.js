let toastBox = document.getElementById('toastBox');
let successMsg = '<i class="fa-solid fa-circle-check"></i> Login successful!';
let errorMsg = '<i class="fa-solid fa-circle-xmark"></i> Incorrect username or password.';
let invalidMsg = '<i class="fa-solid fa-circle-exclamation"></i> Please enter valid characters only.';

function showToast(msg){
    let toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerHTML = msg;
    toastBox.appendChild(toast);

    if(msg.includes('Incorrect')){
        toast.classList.add('error');
    }
    if(msg.includes('valid')){
        toast.classList.add('valid');
    }

    setTimeout(() => {
        toast.remove();
    }, 4000);
}

function checkLogin(){
    let username = document.getElementById('usernameTxt').value;
    let password = document.getElementById('passwordTxt').value;

    if(username === 'username' && password === 'password'){
        showToast(successMsg);
    } 
    else if(username.includes('@') || username.includes('#') || password.includes('@') || password.includes('#')){
        showToast(invalidMsg);
    }
    else {
        showToast(errorMsg);
    }
}