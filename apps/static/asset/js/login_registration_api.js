// document.addEventListener("DOMContentLoaded",function(){
//     const loginBtn = document.getElementById("login_btn");
//     loginBtn.addEventListener("click",login_api);

// })

// document.addEventListener("DOMContentLoaded",function(){
//     const registrationBtn = document.getElementById("registration_btn");
//     registrationBtn.addEventListener("click",registration_api);
// })

// const loginBtn = document.getElementById("login_btn");
// loginBtn.addEventListener("click",loginBtn);

// const registrationBtn = document.getElementById("registration_btn");
// registrationBtn.addEventListener("click",registration_api);


// document.addEventListener("DOMContentLoaded",function(){
//     const registrationBtn = document.getElementById("registration_btn");
//     const loginBtn = document.getElementById("login_btn");

//     if(registrationBtn){
//         registrationBtn.addEventListener("click",function(e){
//             e.preventDefault();
//             registration_api();
//         });
//     }

//     if(loginBtn){
//         loginBtn.addEventListener("click",function(e){
//             e.preventDefault();
//             login_api();
//         })
//     }

// })
// function login_api(){
//     const email = document.getElementById("email").value.trim();
//     const pwd = document.getElementById("pwd").value.trim();
    
//     console.log("email:"+email+" "+"Password:"+pwd);

//     fetch("http://127.0.0.1:8000/api/login_account/",{
//         method:"POST",
//         headers:{
//             "Content-Type":"application/json",
//         },
//         body:JSON.stringify({
//             email:email,
//             password:pwd
//         })
//     }).then(response =>{
//         if(!response.ok){
//             throw new Error("Network response was not ok");
//         }
//         return response.json()
//     }).then(data =>{
//         console.log("Success:",data);
//     }).catch(error=>{
//         console.log("Error:",error)
//     });
// }

// function registration_api() {
//     const fname = document.getElementById("reg_fname").value.trim();
//     const email = document.getElementById("reg_email").value.trim();
//     const pwd = document.getElementById("reg_pwd").value.trim();
//     const cpwd = document.getElementById("reg_cpwd").value.trim();

//     console.log("Registration → Name:", fname, "Email:", email);

//     if (pwd !== cpwd) {
//         alert("Passwords do not match!");
//         return;
//     }

//     fetch("http://127.0.0.1:8000/api/create_account/", {
//         method: "POST",
//         headers: {
//             'Content-Type': "application/json",
//         },
//         body: JSON.stringify({
//             "username": fname,
//             "email": email,
//             "password": pwd
//         })
//     })
//     .then(response => {
//         if (!response.ok) throw new Error("Registration failed");
//         return response.json();
//     })
//     .then(data => {
//         console.log("Registration Success:", data);
//         alert("Registration successful!");
//         showLogin();  // Switch back to login form
//     })
//     .catch(error => {
//         console.error("Registration Error:", error);
//         alert("Registration failed. Try again.");
//     });
// }




// Toggle login form
function login() {
    document.getElementById("login").style.display = "block";
    document.getElementById("registration").style.display = "none";
}

// Toggle registration form
function registration() {
    document.getElementById("login").style.display = "none";
    document.getElementById("registration").style.display = "block";
}

// Show form and hide content
function showForm() {
    document.getElementById("form").style.display = "block";
    document.getElementById("dynamicContent").style.display = "none";
}

// Show content and hide form
function showContent() {
    document.getElementById("form").style.display = "none";
    document.getElementById("dynamicContent").style.display = "block";
}

// Logout
function logout() {
    showForm();
    login(); // default back to login view
}

// On DOM load, attach form events
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("login_btn").addEventListener("click", function (e) {
        e.preventDefault();
        login_api();
    });

    document.getElementById("registration_btn").addEventListener("click", function (e) {
        e.preventDefault();
        registration_api();
    });
});

// LOGIN API
function login_api() {
    const email = document.getElementById("email").value.trim();
    const pwd = document.getElementById("pwd").value.trim();

    fetch("http://127.0.0.1:8000/api/login_account/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: pwd
        })
    }).then(response => {
        if (!response.ok) throw new Error("Invalid login");
        return response.json();
    }).then(data => {
        console.log("Login success:", data);
        showContent();
    }).catch(err => {
        alert("Login failed!");
        console.error(err);
    });
}

// REGISTRATION API
function registration_api() {
    const fname = document.getElementById("reg_fname").value.trim();
    const email = document.getElementById("reg_email").value.trim();
    const pwd = document.getElementById("reg_pwd").value.trim();
    const cpwd = document.getElementById("reg_cpwd").value.trim();

    if (pwd !== cpwd) {
        alert("Passwords do not match!");
        return;
    }

    fetch("http://127.0.0.1:8000/api/register_account/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fullname: fname,
            email: email,
            password: pwd
        })
    }).then(response => {
        if (!response.ok) throw new Error("Registration failed");
        return response.json();
    }).then(data => {
        alert("Registration successful!");
        showContent();
    }).catch(err => {
        alert("Registration failed!");
        console.error(err);
    });
}
