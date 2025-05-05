function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "1234") {
        window.location.href = "../DashBoard/dashboard.html"; //Redirecionada para Dashboard.html       
    } else {
        document.getElementById("message").style.color = "red";
        document.getElementById("message").textContent = "Usuário ou senha incorretos!";
    }
}

