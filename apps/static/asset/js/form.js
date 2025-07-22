 function showContent() {
    const content = document.getElementById("dynamicContent");
    if (content) {
      content.style.display = "block";
    }
}
function login(){
    const login = document.getElementById('login');
    const registration = document.getElementById('registration');
    
    login.style.display='block';
    registration.style.display='none'
}
function registration(){
    const login = document.getElementById('login');
    const registration = document.getElementById('registration');

    login.style.display='none';
    registration.style.display='block'
}

window.onload = function () {
    login(); // or registration(); or hide both if you prefer
};